import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, PreloadingStrategy, Route } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './home/about/about.component';
import { AppPreloadingStrategy } from './preloader-module.service';




export const AppRoutes: Routes = [
  { path: '', redirectTo: 'recette', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },

  { path: 'recette', loadChildren: () => import('./recette/recette.module').then(m => m.RecetteModule), data: { preload: true, delay: false } },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), data: { preload: true, delay: true } },
  { path: 'img', loadChildren: () => import('./utils/utils.module').then(m => m.UtilsModule), data: { preload: false, delay: false } },
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
    ,
    // relativeLinkResolution: 'legacy',
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule { }


