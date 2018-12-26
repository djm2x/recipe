import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  template: `<h1>not yet configured</h1>`,
  // styleUrls: ['./home.component.css']
})
export class PageNotFoundComponent implements OnInit {
  title = 'app';
  d = new Date();
  private history = [];

  constructor(/*public session: SessionService,*/ private router: Router) { }

  ngOnInit() {
  }

}
