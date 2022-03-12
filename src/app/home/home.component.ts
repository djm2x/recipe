import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'app';
  d = new Date();
  private history = [];

  public isShowingRouteLoadIndicator: boolean;

  constructor(private router: Router) { }
  ngOnInit(): void {
    // this.m();
    // this.loadModule();
  }

  loadModule() {

    this.isShowingRouteLoadIndicator = false;
    let asyncLoadCount = 0;
    this.router.events.subscribe(
      (event: RouterEvent): void => {

        if (event instanceof RouteConfigLoadStart) {
          if (event.route.path === 'recette') {
            asyncLoadCount--;
          }
          // console.log(event);
        } else if (event instanceof RouteConfigLoadEnd) {
          if (event.route.path === 'recette') {
            asyncLoadCount--;
          }
        }

        this.isShowingRouteLoadIndicator = !!asyncLoadCount;
      }
    );
  }


}
