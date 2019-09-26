import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPagamento, Pagamento } from 'app/shared/model/pagamento.model';
import { PagamentoService } from './pagamento.service';

@Component({
  selector: 'jhi-pagamento-update',
  templateUrl: './pagamento-update.component.html'
})
export class PagamentoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    valor: [],
    tipoPagameno: []
  });

  constructor(protected pagamentoService: PagamentoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pagamento }) => {
      this.updateForm(pagamento);
    });
  }

  updateForm(pagamento: IPagamento) {
    this.editForm.patchValue({
      id: pagamento.id,
      valor: pagamento.valor,
      tipoPagameno: pagamento.tipoPagameno
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pagamento = this.createFromForm();
    if (pagamento.id !== undefined) {
      this.subscribeToSaveResponse(this.pagamentoService.update(pagamento));
    } else {
      this.subscribeToSaveResponse(this.pagamentoService.create(pagamento));
    }
  }

  private createFromForm(): IPagamento {
    return {
      ...new Pagamento(),
      id: this.editForm.get(['id']).value,
      valor: this.editForm.get(['valor']).value,
      tipoPagameno: this.editForm.get(['tipoPagameno']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagamento>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
