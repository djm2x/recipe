import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LastUrlService {
  private history = [];
  // z: Subscription;
  constructor(private router: Router) {}

  public loadRouting(): void {
    this.router.events
      .subscribe((last: NavigationEnd) => {
        this.history = [...this.history, last];
        // console.log(this.history = [...this.history, last]);
      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '';
  }
}
