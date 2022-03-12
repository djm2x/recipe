import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../auth/shared/session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public session: SessionService) { }

  ngOnInit() {
  }

  get userID(): string {
    return this.session.userID();
  }

  get userName(): string {
    return this.session.userName();
  }

  get userImg(): string {
    return this.session.userImg;
  }

  get doSignOut() {
    this.session.doSignOut();
    return 0;
  }

  get isSignedIn() {
    return this.session.isSignedIn();
  }

}
