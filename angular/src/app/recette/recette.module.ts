import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecetteRoutingModule } from './recette-routing.module';
import { RecetteComponent } from './recette/recette.component';
import { AddRecetteComponent } from './add-recette/add-recette.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListRecetteComponent } from './list-recette/list-recette.component';
import { DetailRecetteComponent } from './detail-recette/detail-recette.component';
import { EditRecetteComponent } from './edit-recette/edit-recette.component';
import { CommentModule } from '../comment/comment.module';
import { AddComponent } from './carnet/add/add.component';
import { CarnetComponent } from './carnet/carnet.component';
import { MatModule } from '../mat.module';
import { DeleteRecetteComponent } from './delete-recette/delete-recette.component';
import { ListRecetteSharedComponent } from './list-recette-shared/list-recette-shared.component';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  declarations: [
    RecetteComponent,
    AddRecetteComponent,
    ListRecetteComponent,
    DetailRecetteComponent,
    EditRecetteComponent,
    AddComponent,
    CarnetComponent,
    DeleteRecetteComponent,
    ListRecetteSharedComponent,
  ],
  imports: [
    CommonModule,
    RecetteRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommentModule,
    UtilsModule,
    MatModule,
  ],
  entryComponents: [
    DeleteRecetteComponent,
  ],
})
export class RecetteModule { }
