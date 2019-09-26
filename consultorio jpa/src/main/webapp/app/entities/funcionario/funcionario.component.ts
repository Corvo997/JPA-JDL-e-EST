import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFuncionario } from 'app/shared/model/funcionario.model';
import { AccountService } from 'app/core/auth/account.service';
import { FuncionarioService } from './funcionario.service';

@Component({
  selector: 'jhi-funcionario',
  templateUrl: './funcionario.component.html'
})
export class FuncionarioComponent implements OnInit, OnDestroy {
  funcionarios: IFuncionario[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected funcionarioService: FuncionarioService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.funcionarioService
      .query()
      .pipe(
        filter((res: HttpResponse<IFuncionario[]>) => res.ok),
        map((res: HttpResponse<IFuncionario[]>) => res.body)
      )
      .subscribe(
        (res: IFuncionario[]) => {
          this.funcionarios = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFuncionarios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFuncionario) {
    return item.id;
  }

  registerChangeInFuncionarios() {
    this.eventSubscriber = this.eventManager.subscribe('funcionarioListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
