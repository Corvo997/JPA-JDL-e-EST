import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Consultorio5TestModule } from '../../../test.module';
import { ConsultorioUpdateComponent } from 'app/entities/consultorio/consultorio-update.component';
import { ConsultorioService } from 'app/entities/consultorio/consultorio.service';
import { Consultorio } from 'app/shared/model/consultorio.model';

describe('Component Tests', () => {
  describe('Consultorio Management Update Component', () => {
    let comp: ConsultorioUpdateComponent;
    let fixture: ComponentFixture<ConsultorioUpdateComponent>;
    let service: ConsultorioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Consultorio5TestModule],
        declarations: [ConsultorioUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ConsultorioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConsultorioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsultorioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Consultorio(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Consultorio();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
