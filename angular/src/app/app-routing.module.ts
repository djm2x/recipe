import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, PreloadingStrategy, Route } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './home/about/about.component';
import { AppPreloadingStrategy } from './preloader-module.service';
import { IssamComponent } from './home/issam/issam.component';




export const AppRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'issam', component: IssamComponent },

  { path: 'recette', loadChildren: './recette/recette.module#RecetteModule', data: { preload: true, delay: false } },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule', data: { preload: true, delay: true } },
  { path: 'img', loadChildren: './utils/utils.module#UtilsModule', data: { preload: false, delay: false } },
  { path: '**', component: PageNotFoundComponent },
  // {
  // path: 'login', loadChildren: './auth/auth.module#AuthModule',
  // path: '', component: HomeComponent,
  // children: [
  //   { path: 'login', loadChildren: './auth/auth.module#AuthModule'},
  //   // { path: 'login', loadChildren: './auth/auth.module#AuthModule'},
  //   // { path: 'login', loadChildren: './auth/auth.module#AuthModule'},
  // ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, {
    // enableTracing: true, // <-- debugging purposes only
    preloadingStrategy: AppPreloadingStrategy // PreloadAllModules
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }


