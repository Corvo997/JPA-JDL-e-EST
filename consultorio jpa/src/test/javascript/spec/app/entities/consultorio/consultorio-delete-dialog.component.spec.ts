import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Consultorio5TestModule } from '../../../test.module';
import { ConsultorioDeleteDialogComponent } from 'app/entities/consultorio/consultorio-delete-dialog.component';
import { ConsultorioService } from 'app/entities/consultorio/consultorio.service';

describe('Component Tests', () => {
  describe('Consultorio Management Delete Component', () => {
    let comp: ConsultorioDeleteDialogComponent;
    let fixture: ComponentFixture<ConsultorioDeleteDialogComponent>;
    let service: ConsultorioService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Consultorio5TestModule],
        declarations: [ConsultorioDeleteDialogComponent]
      })
        .overrideTemplate(ConsultorioDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConsultorioDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsultorioService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
