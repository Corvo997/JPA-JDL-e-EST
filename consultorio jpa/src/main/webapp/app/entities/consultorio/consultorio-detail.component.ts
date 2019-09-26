import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsultorio } from 'app/shared/model/consultorio.model';

@Component({
  selector: 'jhi-consultorio-detail',
  templateUrl: './consultorio-detail.component.html'
})
export class ConsultorioDetailComponent implements OnInit {
  consultorio: IConsultorio;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ consultorio }) => {
      this.consultorio = consultorio;
    });
  }

  previousState() {
    window.history.back();
  }
}
