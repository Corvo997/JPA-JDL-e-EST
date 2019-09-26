import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPessoa, Pessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from './pessoa.service';
import { IConsulta } from 'app/shared/model/consulta.model';
import { ConsultaService } from 'app/entities/consulta/consulta.service';

@Component({
  selector: 'jhi-pessoa-update',
  templateUrl: './pessoa-update.component.html'
})
export class PessoaUpdateComponent implements OnInit {
  isSaving: boolean;

  consultas: IConsulta[];

  editForm = this.fb.group({
    id: [],
    nome: [],
    cpf: [],
    sexo: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected pessoaService: PessoaService,
    protected consultaService: ConsultaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pessoa }) => {
      this.updateForm(pessoa);
    });
    this.consultaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IConsulta[]>) => mayBeOk.ok),
        map((response: HttpResponse<IConsulta[]>) => response.body)
      )
      .subscribe((res: IConsulta[]) => (this.consultas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(pessoa: IPessoa) {
    this.editForm.patchValue({
      id: pessoa.id,
      nome: pessoa.nome,
      cpf: pessoa.cpf,
      sexo: pessoa.sexo
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pessoa = this.createFromForm();
    if (pessoa.id !== undefined) {
      this.subscribeToSaveResponse(this.pessoaService.update(pessoa));
    } else {
      this.subscribeToSaveResponse(this.pessoaService.create(pessoa));
    }
  }

  private createFromForm(): IPessoa {
    return {
      ...new Pessoa(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      cpf: this.editForm.get(['cpf']).value,
      sexo: this.editForm.get(['sexo']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPessoa>>) {
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

  trackConsultaById(index: number, item: IConsulta) {
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
