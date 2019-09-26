import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConsultorio } from 'app/shared/model/consultorio.model';
import { ConsultorioService } from './consultorio.service';

@Component({
  selector: 'jhi-consultorio-delete-dialog',
  templateUrl: './consultorio-delete-dialog.component.html'
})
export class ConsultorioDeleteDialogComponent {
  consultorio: IConsultorio;

  constructor(
    protected consultorioService: ConsultorioService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.consultorioService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'consultorioListModification',
        content: 'Deleted an consultorio'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-consultorio-delete-popup',
  template: ''
})
export class ConsultorioDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ consultorio }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ConsultorioDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.consultorio = consultorio;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/consultorio', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/consultorio', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
