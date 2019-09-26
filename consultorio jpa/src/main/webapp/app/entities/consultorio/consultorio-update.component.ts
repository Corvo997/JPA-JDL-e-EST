import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IConsultorio, Consultorio } from 'app/shared/model/consultorio.model';
import { ConsultorioService } from './consultorio.service';
import { IConsulta } from 'app/shared/model/consulta.model';
import { ConsultaService } from 'app/entities/consulta/consulta.service';
import { IFuncionario } from 'app/shared/model/funcionario.model';
import { FuncionarioService } from 'app/entities/funcionario/funcionario.service';

@Component({
  selector: 'jhi-consultorio-update',
  templateUrl: './consultorio-update.component.html'
})
export class ConsultorioUpdateComponent implements OnInit {
  isSaving: boolean;

  consultas: IConsulta[];

  funcionarios: IFuncionario[];

  editForm = this.fb.group({
    id: [],
    nome: [],
    consultas: [],
    funcionario: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected consultorioService: ConsultorioService,
    protected consultaService: ConsultaService,
    protected funcionarioService: FuncionarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ consultorio }) => {
      this.updateForm(consultorio);
    });
    this.consultaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IConsulta[]>) => mayBeOk.ok),
        map((response: HttpResponse<IConsulta[]>) => response.body)
      )
      .subscribe((res: IConsulta[]) => (this.consultas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.funcionarioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFuncionario[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFuncionario[]>) => response.body)
      )
      .subscribe((res: IFuncionario[]) => (this.funcionarios = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(consultorio: IConsultorio) {
    this.editForm.patchValue({
      id: consultorio.id,
      nome: consultorio.nome,
      consultas: consultorio.consultas,
      funcionario: consultorio.funcionario
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const consultorio = this.createFromForm();
    if (consultorio.id !== undefined) {
      this.subscribeToSaveResponse(this.consultorioService.update(consultorio));
    } else {
      this.subscribeToSaveResponse(this.consultorioService.create(consultorio));
    }
  }

  private createFromForm(): IConsultorio {
    return {
      ...new Consultorio(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      consultas: this.editForm.get(['consultas']).value,
      funcionario: this.editForm.get(['funcionario']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsultorio>>) {
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

  trackFuncionarioById(index: number, item: IFuncionario) {
    return item.id;
  }
}
