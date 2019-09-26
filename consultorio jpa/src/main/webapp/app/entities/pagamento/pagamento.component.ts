import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPagamento } from 'app/shared/model/pagamento.model';
import { AccountService } from 'app/core/auth/account.service';
import { PagamentoService } from './pagamento.service';

@Component({
  selector: 'jhi-pagamento',
  templateUrl: './pagamento.component.html'
})
export class PagamentoComponent implements OnInit, OnDestroy {
  pagamentos: IPagamento[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected pagamentoService: PagamentoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.pagamentoService
      .query()
      .pipe(
        filter((res: HttpResponse<IPagamento[]>) => res.ok),
        map((res: HttpResponse<IPagamento[]>) => res.body)
      )
      .subscribe(
        (res: IPagamento[]) => {
          this.pagamentos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPagamentos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPagamento) {
    return item.id;
  }

  registerChangeInPagamentos() {
    this.eventSubscriber = this.eventManager.subscribe('pagamentoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
