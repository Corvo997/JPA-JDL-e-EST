import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IConsultorio } from 'app/shared/model/consultorio.model';
import { AccountService } from 'app/core/auth/account.service';
import { ConsultorioService } from './consultorio.service';

@Component({
  selector: 'jhi-consultorio',
  templateUrl: './consultorio.component.html'
})
export class ConsultorioComponent implements OnInit, OnDestroy {
  consultorios: IConsultorio[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected consultorioService: ConsultorioService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.consultorioService
      .query()
      .pipe(
        filter((res: HttpResponse<IConsultorio[]>) => res.ok),
        map((res: HttpResponse<IConsultorio[]>) => res.body)
      )
      .subscribe(
        (res: IConsultorio[]) => {
          this.consultorios = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInConsultorios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IConsultorio) {
    return item.id;
  }

  registerChangeInConsultorios() {
    this.eventSubscriber = this.eventManager.subscribe('consultorioListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
