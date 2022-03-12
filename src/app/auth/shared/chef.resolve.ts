// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
// import { Observable } from 'rxjs';
// import { SessionService } from './session.service';
// // import { AuthService } from './auth.service';
// import { ApiService } from './api.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ChefResolve implements  Resolve<any> {

//   constructor(private api: ApiService, private auth: any, private session: SessionService) { }

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
//     return this.api.getById(0).toPromise() as Promise<any>;
//     // console.log('in resolve out' );
//     // if (this.session.accessToken) {
//     //   if (!this.session.chef) {
//     //     console.log('in resolve id = ' + this.session.id);
//     //     this.api.getById(this.session.id)
//     //       .subscribe(
//     //         data => {
//     //           console.log(data);
//     //           console.log('here 000 resolver mother fucker');
//     //         },
//     //         error => {
//     //           console.log(error);
//     //         }
//     //       );
//     //   }
//     // }
//   }
// }
