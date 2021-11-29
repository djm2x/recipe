import { Component, OnInit, HostBinding, ChangeDetectorRef, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostBinding('class.default-theme') defaultTheme = true;
  @HostBinding('class.dark-theme') darkTheme = false;
  @ViewChild('div') divHTML: ElementRef;
  img = '../../../assets/intro.jpg';
  constructor(private overlayContainer: OverlayContainer) { }

  ngOnInit(): void {
    this.themeForBtnNav('default-theme');
  }

  toggleSideNave(eventFromNavBar) {
    this.divHTML.nativeElement.click();
  }

  changeTheme(theme) {
    switch (theme) {
      case 'dark-theme':
      console.log('>>>>>>>>>>>>>');
        this.defaultTheme = false;
        this.darkTheme = true;
        break;
      default:
        this.darkTheme = false;
        this.defaultTheme = true;
        break;
    }
    this.themeForBtnNav(theme);
  }

  themeForBtnNav(theme) {
    // this.themeClass = theme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) => item.includes('-theme'));
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(theme);
  }
}
