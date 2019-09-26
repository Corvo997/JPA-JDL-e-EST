import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPessoa } from 'app/shared/model/pessoa.model';
import { AccountService } from 'app/core/auth/account.service';
import { PessoaService } from './pessoa.service';

@Component({
  selector: 'jhi-pessoa',
  templateUrl: './pessoa.component.html'
})
export class PessoaComponent implements OnInit, OnDestroy {
  pessoas: IPessoa[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected pessoaService: PessoaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.pessoaService
      .query()
      .pipe(
        filter((res: HttpResponse<IPessoa[]>) => res.ok),
        map((res: HttpResponse<IPessoa[]>) => res.body)
      )
      .subscribe(
        (res: IPessoa[]) => {
          this.pessoas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPessoas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPessoa) {
    return item.id;
  }

  registerChangeInPessoas() {
    this.eventSubscriber = this.eventManager.subscribe('pessoaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
