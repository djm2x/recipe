import { Component, OnInit, EventEmitter, Output, Inject, PLATFORM_ID, HostListener, ChangeDetectorRef } from '@angular/core';
import { SessionService } from '../../auth/shared/session.service';
import { isPlatformBrowser } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';

const KEY_THEME = 'THEME01';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @Output() changeTheme = new EventEmitter<string>();
  @Output() toggleSideNave = new EventEmitter<boolean>();

  constructor(public session: SessionService, @Inject(PLATFORM_ID) protected platformId: Object
  , changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    // define the limite size
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    // mobileQuery.matches is listen for the size
    // wa can now use mobileQuery.matches booleen in the template
    this.mobileQuery.addListener((e: MediaQueryListEvent) => changeDetectorRef.detectChanges());
  }

  ngOnInit() {
    this.getThemeUsed();
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   console.log(this.windowRef.innerWidth);
  // }

  // get windowRef() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     return window;
  //   }
  //   return null;
  // }

  toggle() {
    this.toggleSideNave.next(true);
  }

  onChangeTheme(theme: string) {
    this.changeTheme.next(theme);
    this.setThemeChoosing(theme);
  }

  getThemeUsed() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem(KEY_THEME)) {
        const theme = JSON.parse(atob(localStorage.getItem(KEY_THEME)));
        this.changeTheme.next(theme);
      }
    }
  }

  setThemeChoosing(theme) {
    if (isPlatformBrowser(this.platformId)) {
      // localStorage.clear();
      localStorage.setItem(KEY_THEME, btoa(JSON.stringify(theme)));
    }
  }
  apiIssam() {
    if (this.session.userID() === '5bd76f81128b0d31fc8f2b41' || this.session.userID() === '5bd7854f1d755b0013597b57') {
      return true;
    }
    return false;
  }

  public userName(): string {
    return this.session.userName();
  }

  get userImg(): string {
    return this.session.userImg;
  }

  public doSignOut() {
    this.session.doSignOut();
  }

  public isSignedIn() {
    return this.session.isSignedIn();
  }
}
