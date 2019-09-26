import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Consulta } from 'app/shared/model/consulta.model';
import { ConsultaService } from './consulta.service';
import { ConsultaComponent } from './consulta.component';
import { ConsultaDetailComponent } from './consulta-detail.component';
import { ConsultaUpdateComponent } from './consulta-update.component';
import { ConsultaDeletePopupComponent } from './consulta-delete-dialog.component';
import { IConsulta } from 'app/shared/model/consulta.model';

@Injectable({ providedIn: 'root' })
export class ConsultaResolve implements Resolve<IConsulta> {
  constructor(private service: ConsultaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IConsulta> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Consulta>) => response.ok),
        map((consulta: HttpResponse<Consulta>) => consulta.body)
      );
    }
    return of(new Consulta());
  }
}

export const consultaRoute: Routes = [
  {
    path: '',
    component: ConsultaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.consulta.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ConsultaDetailComponent,
    resolve: {
      consulta: ConsultaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.consulta.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ConsultaUpdateComponent,
    resolve: {
      consulta: ConsultaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.consulta.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ConsultaUpdateComponent,
    resolve: {
      consulta: ConsultaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.consulta.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const consultaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ConsultaDeletePopupComponent,
    resolve: {
      consulta: ConsultaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.consulta.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
