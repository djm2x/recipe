import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.css']
})
export class ImgUploadComponent implements OnInit {
  @Input() imgUrl = '../../../assets/uploadIMG.png';
  @Input() width = '600';
  @Input() height = '400';
  // colorInputFile = '';
  // @Output() file: File;
  // send object to be edited to parent component
  @Output() eventToParent = new EventEmitter<File>();
  constructor() { }

  ngOnInit() {
    this.imgUrl = environment.hubUrl + this.imgUrl;
    console.log(this.imgUrl);
  }

  openInput(o/*: HTMLInputElement*/) {
    o.click();
  }

  handleFileInput(files: FileList) {
    this.eventToParent.next(files.item(0));

    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.imgUrl = reader.result.toString();
      // this.colorInputFile = '';
    };

    reader.readAsDataURL(files.item(0));
  }
  imgError(img: any) {
    console.log('>>>>>>>>>>>>>>');
    img.src = '../../../assets/uploadIMG.png';
  }

}
