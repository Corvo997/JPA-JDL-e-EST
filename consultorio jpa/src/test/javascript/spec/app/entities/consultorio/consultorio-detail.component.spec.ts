import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Consultorio5TestModule } from '../../../test.module';
import { ConsultorioDetailComponent } from 'app/entities/consultorio/consultorio-detail.component';
import { Consultorio } from 'app/shared/model/consultorio.model';

describe('Component Tests', () => {
  describe('Consultorio Management Detail Component', () => {
    let comp: ConsultorioDetailComponent;
    let fixture: ComponentFixture<ConsultorioDetailComponent>;
    const route = ({ data: of({ consultorio: new Consultorio(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Consultorio5TestModule],
        declarations: [ConsultorioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ConsultorioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConsultorioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.consultorio).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
