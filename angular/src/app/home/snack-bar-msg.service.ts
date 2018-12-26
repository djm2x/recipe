import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class SnackBarMsgComponent {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    const config = {
      panelClass: ['background-red'],
      duration: 4000
    };

    this.snackBar.open(message, null, config);
  }

}
