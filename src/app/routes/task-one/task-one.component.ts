import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-task-one',
  templateUrl: './task-one.component.html',
  styleUrls: ['./task-one.component.scss'],
})
export class TaskOneComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  isTimerRunning: boolean = false;
  secondsPassed: number = 0;

  ngOnInit() {}

  get formatTime(): string {
    const minutes: number = Math.floor(this.secondsPassed / 60);
    const remainingSeconds: number = this.secondsPassed % 60;

    const formattedMinutes: string = `${minutes}`.padStart(2, '0');
    const formattedSeconds: string = `${remainingSeconds}`.padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  startTimer() {
    let timer$ = interval(1000).pipe(takeUntil(this.destroy$));
    if (!this.isTimerRunning) {
      timer$.subscribe(() => {
        this.secondsPassed++;
      });
      this.isTimerRunning = true;
    }
  }

  pauseTimer() {
    this.destroy$.next(true);
    this.isTimerRunning = false;
  }

  resumeTimer() {
    this.startTimer();
  }

  resetTimer() {
    this.destroy$.next(true);
    this.secondsPassed = 0;
    this.isTimerRunning = false;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.isTimerRunning = false;
  }
}
