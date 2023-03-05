import { isPlatformServer } from '@angular/common';
import { SessionService } from '../auth/shared/session.service';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RealTimeHubService } from './real-time.hub.service';



@Injectable({
  providedIn: 'root'
})
export class UowService {
  config = {};// new ConfigService();

  //utils
  snackBar = inject(MatSnackBar);
  realTimeHub = inject(RealTimeHubService);
  session = inject(SessionService);

  platformId = inject(PLATFORM_ID);
  isServer = isPlatformServer(this.platformId);

  constructor() { }

  snackGen(message = '', action = null, config = { panelClass: ['green-snackbar'], duration: 2000 }) {
    this.snackBar.open(message, action, config);
  }

  snackOk(message = 'Sauvegarde ressié') {
    const config = {
      panelClass: ['green-snackbar'],
      duration: 2000
    };

    this.snackBar.open(message, null, config);
  }

  snackAdd(message = 'Element successfully Added') {
    const config = {
      panelClass: ['green-snackbar'],
      duration: 2000
    };

    this.snackBar.open(message, null, config);
  }

  snackUpdate(message = 'Element successfully Updated') {
    const config = {
      panelClass: ['green-snackbar'],
      duration: 2000
    };

    this.snackBar.open(message, null, config);
  }

  snackDelete(message = 'Element successfully Deleted') {
    const config = {
      panelClass: ['green-snackbar'],
      duration: 2000
    };

    this.snackBar.open(message, null, config);
  }

  valideDate(date: Date): Date {
    date = new Date(date);

    const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
    const minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
    date.setHours(hoursDiff);
    date.setMinutes(minutesDiff);

    return date;
  }
}
