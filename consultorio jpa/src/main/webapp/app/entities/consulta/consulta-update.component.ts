import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IConsulta, Consulta } from 'app/shared/model/consulta.model';
import { ConsultaService } from './consulta.service';
import { IPagamento } from 'app/shared/model/pagamento.model';
import { PagamentoService } from 'app/entities/pagamento/pagamento.service';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/pessoa.service';

@Component({
  selector: 'jhi-consulta-update',
  templateUrl: './consulta-update.component.html'
})
export class ConsultaUpdateComponent implements OnInit {
  isSaving: boolean;

  pagamentos: IPagamento[];

  pessoas: IPessoa[];

  editForm = this.fb.group({
    id: [],
    dataConsulta: [],
    tipoProcedimento: [],
    pagamento: [],
    pessoas: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected consultaService: ConsultaService,
    protected pagamentoService: PagamentoService,
    protected pessoaService: PessoaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ consulta }) => {
      this.updateForm(consulta);
    });
    this.pagamentoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPagamento[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPagamento[]>) => response.body)
      )
      .subscribe((res: IPagamento[]) => (this.pagamentos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.pessoaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPessoa[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPessoa[]>) => response.body)
      )
      .subscribe((res: IPessoa[]) => (this.pessoas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(consulta: IConsulta) {
    this.editForm.patchValue({
      id: consulta.id,
      dataConsulta: consulta.dataConsulta != null ? consulta.dataConsulta.format(DATE_TIME_FORMAT) : null,
      tipoProcedimento: consulta.tipoProcedimento,
      pagamento: consulta.pagamento,
      pessoas: consulta.pessoas
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const consulta = this.createFromForm();
    if (consulta.id !== undefined) {
      this.subscribeToSaveResponse(this.consultaService.update(consulta));
    } else {
      this.subscribeToSaveResponse(this.consultaService.create(consulta));
    }
  }

  private createFromForm(): IConsulta {
    return {
      ...new Consulta(),
      id: this.editForm.get(['id']).value,
      dataConsulta:
        this.editForm.get(['dataConsulta']).value != null ? moment(this.editForm.get(['dataConsulta']).value, DATE_TIME_FORMAT) : undefined,
      tipoProcedimento: this.editForm.get(['tipoProcedimento']).value,
      pagamento: this.editForm.get(['pagamento']).value,
      pessoas: this.editForm.get(['pessoas']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsulta>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackPagamentoById(index: number, item: IPagamento) {
    return item.id;
  }

  trackPessoaById(index: number, item: IPessoa) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
