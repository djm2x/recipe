import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Recette } from '../../model';
import { RecetteService } from '../shared/recette.service';
import { Observable } from 'rxjs';
import { SessionService } from '../../auth/shared/session.service';

@Component({
    selector: 'app-edit-recette',
    template: `<app-add-recette [o]="o" (eventToParent)="put($event)"></app-add-recette>`,
})
export class EditRecetteComponent implements OnInit {
    sub: any;
    o: Recette = new Recette();
    file: File = null;

    constructor(private route: ActivatedRoute, private service: RecetteService
        , public router: Router, private sesseion: SessionService) { }

    ngOnInit() {
        this.getObjectFromRouteResolver();
    }

    getObjectFromRouteResolver() {
        this.route.data.subscribe(
            r => {
                this.o = <Recette>r['mydata'];
                // if (this.sesseion.role || this.o.idUser._id !== this.sesseion.userID()) {
                //     this.router.navigate(['recette/all']);
                // }
            },
            e => console.log(e)
        );
    }

    put(o: any) {
        this.service.put(this.o._id, o)
            .subscribe(r => {
                this.router.navigate(['/recette/all']);
            }, e => {
                console.log(e);
            });
    }

}

@Injectable({
    providedIn: 'root'
})
export class MyResolve implements Resolve<Observable<Recette>> {

    constructor(public service: RecetteService) { }

    public resolve(route: ActivatedRouteSnapshot) {
        // console.log(route.paramMap.get('id'));
        return this.service.get(route.paramMap.get('id')) as Observable<Recette>;
    }

}
