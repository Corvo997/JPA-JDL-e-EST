import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Consultorio5TestModule } from '../../../test.module';
import { FuncionarioComponent } from 'app/entities/funcionario/funcionario.component';
import { FuncionarioService } from 'app/entities/funcionario/funcionario.service';
import { Funcionario } from 'app/shared/model/funcionario.model';

describe('Component Tests', () => {
  describe('Funcionario Management Component', () => {
    let comp: FuncionarioComponent;
    let fixture: ComponentFixture<FuncionarioComponent>;
    let service: FuncionarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Consultorio5TestModule],
        declarations: [FuncionarioComponent],
        providers: []
      })
        .overrideTemplate(FuncionarioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FuncionarioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FuncionarioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Funcionario(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.funcionarios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
