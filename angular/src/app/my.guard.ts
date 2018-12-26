import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './auth/shared/session.service';

@Injectable({
  providedIn: 'root'
})
export class MyGuard implements CanActivate {

  constructor(private session: SessionService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.session.isSignedIn()) {
      console.log('out');
      this.router.navigate(['auth/login']);
      return false;
    }
    console.log('in');

    return true;
  }
}
