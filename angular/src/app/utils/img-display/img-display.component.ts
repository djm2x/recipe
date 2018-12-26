import { Component, OnInit, Input, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

const API_URL = environment.hubUrl;
const ASSETS_PATH = '../../../assets/';
const IMG_ERR = ASSETS_PATH + 'uploadIMG.png';
const IMG_GIF = ASSETS_PATH + 'loading.gif';
const IMG2_GIF = ASSETS_PATH + 'disk.gif';
const IMG_Loading = ASSETS_PATH + 'loading.jpg';

@Component({
  selector: 'app-img-display',
  templateUrl: './img-display.component.html',
  styleUrls: ['./img-display.component.css']
})
export class ImgDisplayComponent implements OnInit {
  @Input() img: string;
  @Input() width = '';
  @Input() height = '';
  @Input() radius = '';
  @Input() border = '';
  @Input() paddingRight = '';
  @Input() widthProgressBar = '';
  @Input() heightProgressBar = '';
  @ViewChild('im') imgHTML: ElementRef;
  isImageLoading = true;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) protected platformId: Object) { }

  ngOnInit() {
    this.getImageFromService();
  }

  service(): Observable<Blob> {
    return this.http.get(API_URL + this.img, { responseType: 'blob' });
  }

  getImageFromService() {
    // this.imgHTML.nativeElement.src = IMG2_GIF;
    this.imgHTML.nativeElement.src = IMG_Loading;
    // this.isImageLoading = true;
    this.service().subscribe(
      data => {
        if (isPlatformBrowser(this.platformId)) {
          this.imgHTML.nativeElement.src = URL.createObjectURL(data);
        }
        // this.isImageLoading = false;
      }, error => {
        // console.log(error);
        this.imgHTML.nativeElement.src = IMG_ERR;
      }
    );
  }

  imgError(img: any) {
    console.log('er', img.src);
    img.src = IMG_ERR;
  }
}
