import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Consultorio5TestModule } from '../../../test.module';
import { ConsultorioComponent } from 'app/entities/consultorio/consultorio.component';
import { ConsultorioService } from 'app/entities/consultorio/consultorio.service';
import { Consultorio } from 'app/shared/model/consultorio.model';

describe('Component Tests', () => {
  describe('Consultorio Management Component', () => {
    let comp: ConsultorioComponent;
    let fixture: ComponentFixture<ConsultorioComponent>;
    let service: ConsultorioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Consultorio5TestModule],
        declarations: [ConsultorioComponent],
        providers: []
      })
        .overrideTemplate(ConsultorioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConsultorioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsultorioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Consultorio(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.consultorios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
