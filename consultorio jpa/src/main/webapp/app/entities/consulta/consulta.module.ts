import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Consultorio5SharedModule } from 'app/shared/shared.module';
import { ConsultaComponent } from './consulta.component';
import { ConsultaDetailComponent } from './consulta-detail.component';
import { ConsultaUpdateComponent } from './consulta-update.component';
import { ConsultaDeletePopupComponent, ConsultaDeleteDialogComponent } from './consulta-delete-dialog.component';
import { consultaRoute, consultaPopupRoute } from './consulta.route';

const ENTITY_STATES = [...consultaRoute, ...consultaPopupRoute];

@NgModule({
  imports: [Consultorio5SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ConsultaComponent,
    ConsultaDetailComponent,
    ConsultaUpdateComponent,
    ConsultaDeleteDialogComponent,
    ConsultaDeletePopupComponent
  ],
  entryComponents: [ConsultaDeleteDialogComponent]
})
export class Consultorio5ConsultaModule {}
