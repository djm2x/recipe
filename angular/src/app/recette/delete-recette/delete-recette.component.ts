import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { RecetteService } from '../shared/recette.service';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-recette',
  templateUrl: './delete-recette.component.html',
  styleUrls: ['./delete-recette.component.css']
})
export class DeleteRecetteComponent implements OnInit {
  z = new Observable(o => o.next('ok'));
  constructor(public dialogRef: MatDialogRef<DeleteRecetteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog, private service: RecetteService) { }

  ngOnInit() {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    // setTimeout(
    //   () => {
    //     this.z = new Observable(o => o.next(true));
    //     console.log('times up');
    //   },
    //   3000
    // );

    // return;
    this.service.delete(this.data.id).subscribe(
      r => {
        console.log(r);
      },
      e => console.log(e)
    );
  }

}

interface DataDialog {
  id: number;
  obj: string;
}
