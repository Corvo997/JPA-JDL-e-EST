import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Funcionario } from 'app/shared/model/funcionario.model';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioComponent } from './funcionario.component';
import { FuncionarioDetailComponent } from './funcionario-detail.component';
import { FuncionarioUpdateComponent } from './funcionario-update.component';
import { FuncionarioDeletePopupComponent } from './funcionario-delete-dialog.component';
import { IFuncionario } from 'app/shared/model/funcionario.model';

@Injectable({ providedIn: 'root' })
export class FuncionarioResolve implements Resolve<IFuncionario> {
  constructor(private service: FuncionarioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFuncionario> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Funcionario>) => response.ok),
        map((funcionario: HttpResponse<Funcionario>) => funcionario.body)
      );
    }
    return of(new Funcionario());
  }
}

export const funcionarioRoute: Routes = [
  {
    path: '',
    component: FuncionarioComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.funcionario.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FuncionarioDetailComponent,
    resolve: {
      funcionario: FuncionarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.funcionario.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FuncionarioUpdateComponent,
    resolve: {
      funcionario: FuncionarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.funcionario.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FuncionarioUpdateComponent,
    resolve: {
      funcionario: FuncionarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.funcionario.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const funcionarioPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FuncionarioDeletePopupComponent,
    resolve: {
      funcionario: FuncionarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'consultorio5App.funcionario.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
