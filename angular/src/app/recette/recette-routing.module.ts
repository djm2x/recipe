import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecetteComponent } from './recette/recette.component';
import { AddRecetteComponent } from './add-recette/add-recette.component';
import { ListRecetteComponent } from './list-recette/list-recette.component';
import { DetailRecetteComponent, MyDetailResolve } from './detail-recette/detail-recette.component';
import { EditRecetteComponent, MyResolve } from './edit-recette/edit-recette.component';
import { CarnetComponent } from './carnet/carnet.component';
import { MyGuard } from '../my.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'recettes', pathMatch: 'full' },
  { path: 'all', component: RecetteComponent/*, resolve: {mydata: RecetteResolve}*/ },
  { path: 'add-recette', component: AddRecetteComponent, canActivate: [MyGuard] },
  { path: 'list-recette/:id', component: ListRecetteComponent, canActivate: [MyGuard] },
  { path: 'carnet/:id', component: CarnetComponent, canActivate: [MyGuard] },
  { path: 'detail-recette/:id', component: DetailRecetteComponent, resolve: { mydata: MyDetailResolve } },
  { path: 'edit-recette/:id', component: EditRecetteComponent, resolve: { mydata: MyResolve}, canActivate: [MyGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecetteRoutingModule { }
