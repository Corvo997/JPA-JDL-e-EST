import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFuncionario } from 'app/shared/model/funcionario.model';

@Component({
  selector: 'jhi-funcionario-detail',
  templateUrl: './funcionario-detail.component.html'
})
export class FuncionarioDetailComponent implements OnInit {
  funcionario: IFuncionario;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ funcionario }) => {
      this.funcionario = funcionario;
    });
  }

  previousState() {
    window.history.back();
  }
}
