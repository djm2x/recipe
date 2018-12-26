import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './home/loader/loader.component';
import { LoaderInterceptor } from './home/loader/loader-interceptor';
import { NavbarComponent } from './home/navbar/navbar.component';
import { MatModule } from './mat.module.1';
import { AboutComponent } from './home/about/about.component';
import { UtilsModule } from './utils/utils.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { MyGuard } from './my.guard';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { FooterComponent } from './home/footer/footer.component';
import { IssamComponent } from './home/issam/issam.component';
import { TableSharedComponent } from './home/table-shared/table-shared.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent,
    LoaderComponent,
    AboutComponent,
    SidebarComponent,
    FooterComponent,
    IssamComponent,
    TableSharedComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatModule,
    UtilsModule,
    // RouterModule.forRoot(AppRoutes),
    // HttpClientModule ,
    // ToastrModule.forRoot()
  ],
  providers: [
    MyGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3000 }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
