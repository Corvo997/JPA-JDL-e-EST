import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Consultorio5TestModule } from '../../../test.module';
import { FuncionarioUpdateComponent } from 'app/entities/funcionario/funcionario-update.component';
import { FuncionarioService } from 'app/entities/funcionario/funcionario.service';
import { Funcionario } from 'app/shared/model/funcionario.model';

describe('Component Tests', () => {
  describe('Funcionario Management Update Component', () => {
    let comp: FuncionarioUpdateComponent;
    let fixture: ComponentFixture<FuncionarioUpdateComponent>;
    let service: FuncionarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Consultorio5TestModule],
        declarations: [FuncionarioUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FuncionarioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FuncionarioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FuncionarioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Funcionario(123);
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
        const entity = new Funcionario();
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
