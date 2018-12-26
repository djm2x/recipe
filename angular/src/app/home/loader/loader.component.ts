import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { LoaderInterceptor } from './loader-interceptor';

@Component({
  selector: 'app-loader',
  templateUrl: 'loader.component.html',
  // template: ``
})
export class LoaderComponent implements OnInit {

  constructor(public loader: LoaderService) { }

  ngOnInit() { }
}
