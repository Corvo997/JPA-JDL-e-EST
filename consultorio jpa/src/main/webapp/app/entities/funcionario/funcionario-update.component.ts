import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IFuncionario, Funcionario } from 'app/shared/model/funcionario.model';
import { FuncionarioService } from './funcionario.service';

@Component({
  selector: 'jhi-funcionario-update',
  templateUrl: './funcionario-update.component.html'
})
export class FuncionarioUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    numeroRegistro: [],
    nome: [],
    salario: []
  });

  constructor(protected funcionarioService: FuncionarioService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ funcionario }) => {
      this.updateForm(funcionario);
    });
  }

  updateForm(funcionario: IFuncionario) {
    this.editForm.patchValue({
      id: funcionario.id,
      numeroRegistro: funcionario.numeroRegistro,
      nome: funcionario.nome,
      salario: funcionario.salario
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const funcionario = this.createFromForm();
    if (funcionario.id !== undefined) {
      this.subscribeToSaveResponse(this.funcionarioService.update(funcionario));
    } else {
      this.subscribeToSaveResponse(this.funcionarioService.create(funcionario));
    }
  }

  private createFromForm(): IFuncionario {
    return {
      ...new Funcionario(),
      id: this.editForm.get(['id']).value,
      numeroRegistro: this.editForm.get(['numeroRegistro']).value,
      nome: this.editForm.get(['nome']).value,
      salario: this.editForm.get(['salario']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFuncionario>>) {
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
