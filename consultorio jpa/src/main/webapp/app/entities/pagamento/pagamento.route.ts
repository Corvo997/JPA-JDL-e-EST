import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Pagamento } from 'app/shared/model/pagamento.model';
import { PagamentoService } from './pagamento.service';
import { PagamentoComponent } from './pagamento.component';
import { PagamentoDetailComponent } from './pagamento-detail.component';
import { PagamentoUpdateComponent } from './pagamento-update.component';
import { PagamentoDeletePopupComponent } from './pagamento-delete-dialog.component';
import { IPagamento } from 'app/shared/model/pagamento.model';

@Injectable({ providedIn: 'root' })
export class PagamentoResolve implements Resolve<IPagamento> {
  constructor(private service: PagamentoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPagamento> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Pagamento>) => response.ok),
        map((pagamento: HttpResponse<Pagamento>) => pagamento.body)
      );
    }
    return of(new Pagamento());
  }
}

export const pagamentoRoute: Routes = [
  {
    path: '',
    component: PagamentoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.pagamento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PagamentoDetailComponent,
    resolve: {
      pagamento: PagamentoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.pagamento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PagamentoUpdateComponent,
    resolve: {
      pagamento: PagamentoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.pagamento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PagamentoUpdateComponent,
    resolve: {
      pagamento: PagamentoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.pagamento.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pagamentoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PagamentoDeletePopupComponent,
    resolve: {
      pagamento: PagamentoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.pagamento.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
