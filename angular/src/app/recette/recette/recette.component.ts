import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recette } from '../../model';
import { RecetteService } from '../shared/recette.service';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material';
import { DeleteRecetteComponent } from '../delete-recette/delete-recette.component';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css'],
})
export class RecetteComponent implements OnInit {
  // imgUrl = '../../../assets/uploadIMG.png';
  // o: Recette = new Recette();
  // list: Recette[] = [];
  // API_URL = environment.hubUrl;
  constructor(private title: Title, private meta: Meta) { }

  ngOnInit() {
    this.title.setTitle('About / Angular SSR');
    this.meta.updateTag({
        'description': 'Welcome to about section'
    });
  }

  // imgError(img: any) {
  //   img.src = this.imgUrl;
  // }

  // private makeCarousel(): void {
  //   let i = 0;
  //   const t = 7000;
  //   const lenght: number = this.list.length;
  //   const l: Recette[] = this.list;
  //   //
  //   this.o = l[i++];
  //   //
  //   setInterval(() => {
  //     this.o = l[i++];
  //     (i === lenght) ? (i = 0) : (i = i);
  //   }, t);
  // }
}
