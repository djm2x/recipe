import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { CommentComponent } from './comment/comment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CountCommentComponent } from './count-comment/count-comment.component';
import { NoteRecetteComponent } from './note-recette/note-recette.component';
import { MatModule } from '../mat.module';

@NgModule({
  imports: [
    CommonModule,
    CommentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatModule
  ],
  declarations: [
    CommentComponent,
    CountCommentComponent,
    NoteRecetteComponent,
  ],
  exports: [
    CommentComponent,
    CountCommentComponent,
    NoteRecetteComponent,
  ],
})
export class CommentModule { }
