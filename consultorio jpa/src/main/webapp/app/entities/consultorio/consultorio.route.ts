import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Consultorio } from 'app/shared/model/consultorio.model';
import { ConsultorioService } from './consultorio.service';
import { ConsultorioComponent } from './consultorio.component';
import { ConsultorioDetailComponent } from './consultorio-detail.component';
import { ConsultorioUpdateComponent } from './consultorio-update.component';
import { ConsultorioDeletePopupComponent } from './consultorio-delete-dialog.component';
import { IConsultorio } from 'app/shared/model/consultorio.model';

@Injectable({ providedIn: 'root' })
export class ConsultorioResolve implements Resolve<IConsultorio> {
  constructor(private service: ConsultorioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IConsultorio> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Consultorio>) => response.ok),
        map((consultorio: HttpResponse<Consultorio>) => consultorio.body)
      );
    }
    return of(new Consultorio());
  }
}

export const consultorioRoute: Routes = [
  {
    path: '',
    component: ConsultorioComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.consultorio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ConsultorioDetailComponent,
    resolve: {
      consultorio: ConsultorioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.consultorio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ConsultorioUpdateComponent,
    resolve: {
      consultorio: ConsultorioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.consultorio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ConsultorioUpdateComponent,
    resolve: {
      consultorio: ConsultorioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.consultorio.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const consultorioPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ConsultorioDeletePopupComponent,
    resolve: {
      consultorio: ConsultorioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.consultorio.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
