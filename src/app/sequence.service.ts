import { Sequence } from './models/sequence.model';
import { EventEmitter } from '@angular/core';
import { Note } from './models/note.model';
declare var responsiveVoice;

export class SequenceService {
  public playingSequence: Sequence;
  private playingNote = new EventEmitter<Note>();
  private ended = new EventEmitter<boolean>();
  private soundMatch = new EventEmitter<boolean>();
  private positionMatch = new EventEmitter<boolean>();
  public currentIndex: number;
  private records: any[];
  private timer: any;

  /**
   * Load a sequence to be played
   * @param {Sequence} sequence to be played
   */
  initSequence (sequence: Sequence) {
    this.playingSequence = sequence;
  }

  /**
   * Play a note of the loaded sequence
   * @param {number} index of note to be played
   */
  playNote (index: number) {
    const record = {
      sound_match: false,
      position_match: false,
      user_match_sound: false,
      user_match_position: false,
    };
    if (index >= this.playingSequence.n) {
      if (this.playingSequence.notes[index].x === this.playingSequence.notes[index - this.playingSequence.n].x &&
        this.playingSequence.notes[index].y === this.playingSequence.notes[index - this.playingSequence.n].y) {
        record.position_match = true;
      }
      if (this.playingSequence.notes[index].sound === this.playingSequence.notes[index - this.playingSequence.n].sound) {
        record.sound_match = true;
      }
    }
    this.records.push(record);
    this.playingNote.emit(this.playingSequence.notes[index]);
    responsiveVoice.speak(this.playingSequence.notes[index].sound);
  }

  /**
   * Play loaded sequence
   * @param {number} interval of time between each notes
   */
  playSequence (interval: number) {
    this.currentIndex = -1;
    this.records = [];
    this.timer = setInterval(() => {
      if (this.currentIndex >= this.playingSequence.notes.length - 1) {
        this.endSequence();
        this.ended.emit(true);
      } else {
        this.currentIndex++;
        this.playNote(this.currentIndex);
      }
    }, interval);
  }

  /**
   * Stop the playing sequence
   */
  stopSequence () {
    this.endSequence();
    this.ended.emit(false);
  }

  /**
   * Reset when a sequence is done
   */
  endSequence () {
    clearInterval(this.timer);
    this.currentIndex = -1;
  }

  /**
   * Fired when a note is played
   * @param callback with the Note played
   */
  onNotePlayed (callback) {
    this.playingNote.subscribe(callback);
  }

  /**
   * Fired when the sequence is done
   * @param callback with true if sequence completed, false if not
   */
  onEnd (callback) {
    this.ended.subscribe(callback);
  }

  /**
   * Fired when user match sound
   * @param callback with true if good match, false if not
   */
  onSoundMatchGuess (callback) {
    this.soundMatch.subscribe(callback);
  }

  /**
   * Fired when user match position
   * @param callback with true if good match, false if not
   */
  onPositionMatchGuess(callback) {
    this.positionMatch.subscribe(callback);
  }

  /**
   * Guess a sound match for the actual note
   */
  matchSoundGuess () {
    this.records[this.currentIndex].user_match_sound = true;
    this.soundMatch.emit(this.records[this.currentIndex].sound_match);
  }

  /**
   * Guess a position match for the actual note
   */
  matchPositionGuess () {
    this.records[this.currentIndex].user_match_position = true;
    this.positionMatch.emit(this.records[this.currentIndex].position_match);
  }

  /**
   * Gather records of the last sequence played
   * @returns {any[]} records
   */
  getRecords () {
    return this.records;
  }
}
