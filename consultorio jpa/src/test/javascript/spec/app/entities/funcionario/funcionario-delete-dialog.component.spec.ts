import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Consultorio5TestModule } from '../../../test.module';
import { FuncionarioDeleteDialogComponent } from 'app/entities/funcionario/funcionario-delete-dialog.component';
import { FuncionarioService } from 'app/entities/funcionario/funcionario.service';

describe('Component Tests', () => {
  describe('Funcionario Management Delete Component', () => {
    let comp: FuncionarioDeleteDialogComponent;
    let fixture: ComponentFixture<FuncionarioDeleteDialogComponent>;
    let service: FuncionarioService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Consultorio5TestModule],
        declarations: [FuncionarioDeleteDialogComponent]
      })
        .overrideTemplate(FuncionarioDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FuncionarioDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FuncionarioService);
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
