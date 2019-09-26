import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IConsulta } from 'app/shared/model/consulta.model';
import { AccountService } from 'app/core/auth/account.service';
import { ConsultaService } from './consulta.service';

@Component({
  selector: 'jhi-consulta',
  templateUrl: './consulta.component.html'
})
export class ConsultaComponent implements OnInit, OnDestroy {
  consultas: IConsulta[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected consultaService: ConsultaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.consultaService
      .query()
      .pipe(
        filter((res: HttpResponse<IConsulta[]>) => res.ok),
        map((res: HttpResponse<IConsulta[]>) => res.body)
      )
      .subscribe(
        (res: IConsulta[]) => {
          this.consultas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInConsultas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IConsulta) {
    return item.id;
  }

  registerChangeInConsultas() {
    this.eventSubscriber = this.eventManager.subscribe('consultaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
