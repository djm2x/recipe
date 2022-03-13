import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { SnackBarMsgComponent } from '../snack-bar-msg.service';
import { SessionService } from '../../auth/shared/session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  public p: Observable<any>;
  i = 0;
  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(private loaderService: LoaderService, public snackBar: SnackBarMsgComponent
    , private session: SessionService, public router: Router) { }

  removeRequest(req: HttpRequest<any>) {
    // console.log('this.requests.length = ', this.requests.length);
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }

    // console.log(i, this.requests.length);
    // this.p = this.requests.length;
    // this.loaderService.progress = this.requests.length;
    // console.log('progress = ', this.loaderService.progress);
    // console.log('this.requests.length = ', this.requests.length);
    //
    this.loaderService.isLoading.next(this.requests.length > 0);
    let b = false;
    if ( this.requests.length === 0) {
      if (b) {
        // this.openSnackBar('Chargement terminer');
        b = false;
      }
      b = true;
    }
    //
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    //
    this.loaderService.isLoading.next(true);
    //
    const o = Observable.create(observer => {
      const reqAddedtoken = req.clone({
        setHeaders: {
          Authorization: `${this.session.token}`,

        }
      });
      const s = next.handle(reqAddedtoken).subscribe(
          event => {
            if (event instanceof HttpResponse) {

              // this.loaderService.progress = this.i++;
              // console.log('progress = ', this.loaderService.progress, this.i);
              this.removeRequest(req);
              observer.next(event);
              // this.openSnackBar(event.statusText);
            }
          }, err => {
            if (err instanceof HttpErrorResponse) {
              console.log(err);
              if (err.status === 401) {
                console.log(reqAddedtoken);
                this.session.doSignOut();
                this.router.navigate(['auth/login']);
                // this.auth.collectFailedRequest(request);
              }
            }
            this.removeRequest(req);
            observer.error(err);
            console.warn(err);
            // this.snackBar.openSnackBar(JSON.stringify(  err.error));
          }, () => {
            this.removeRequest(req);
            observer.complete();
            // this.openSnackBar('Chargement terminer');
          }
        );
      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        s.unsubscribe();
      };
    });
    //
    return o as Observable<HttpEvent<any>>;
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }
public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
}
