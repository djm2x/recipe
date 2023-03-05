import { Component, OnInit, ViewChild } from '@angular/core';
import { TableSharedComponent } from '../table-shared/table-shared.component';
import { IssamService } from './issam.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Bins } from './model';

@Component({
  selector: 'app-issam',
  templateUrl: './issam.component.html',
  styleUrls: ['./issam.component.scss']
})
export class IssamComponent implements OnInit {

  // type_navire_list: string[];
  myForm: UntypedFormGroup;
  o: Bins = new Bins();
  columnDefs = [
    // { columnDef: '_id', headName: '_id' },
    { columnDef: 'appid', headName: 'appid' },
    { columnDef: 'bid', headName: 'bid' },
    { columnDef: 'inid', headName: 'inid'},
    { columnDef: 'message', headName: 'message'},
    { columnDef: 'option', headName: 'Option'},
  ];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['appid', 'bid', 'inid', 'message', 'option'];
  //
  @ViewChild(TableSharedComponent) tableShared: TableSharedComponent;
  //
  isEdit = false;
  //
  constructor(private fb: UntypedFormBuilder, public service: IssamService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      _id: this.o._id,
      appid: this.o.appid,
      bid: this.o.bid,
      inid: this.o.inid,
      message: this.o.message,
    });
  }

  rebuildForm() {
    this.myForm.reset({
      _id: this.o._id,
      appid: this.o.appid,
      bid: this.o.bid,
      inid: this.o.inid,
      message: this.o.message,
    });
  }

  submit(o: UntypedFormGroup) {
    console.log('submit = ', o.value);
    const obj = o.value as Bins;
    if (!this.isEdit) {
      this.post(obj);
    } else {
      this.put(obj);
    }
  }

  post(o: Bins) {
    this.service.post(o)
      .subscribe(r => {
        this.tableShared.update.next(true);
        this.rebuildForm();
        }, e => {
          console.log(e);
      });
  }

  put(o: Bins) {
    this.service.put(o)
      .subscribe(r => {
        this.tableShared.update.next(true);
        this.isEdit = false;
        this.rebuildForm();
        }, e => {
          console.log(e);
      });
  }

  // thi function will be called by child component
  edit(o: Bins) {
    this.o = o;
    this.isEdit = true;
    this.rebuildForm();
  }

}
