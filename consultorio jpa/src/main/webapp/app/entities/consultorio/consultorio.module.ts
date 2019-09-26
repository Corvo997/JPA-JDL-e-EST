import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Consultorio5SharedModule } from 'app/shared/shared.module';
import { ConsultorioComponent } from './consultorio.component';
import { ConsultorioDetailComponent } from './consultorio-detail.component';
import { ConsultorioUpdateComponent } from './consultorio-update.component';
import { ConsultorioDeletePopupComponent, ConsultorioDeleteDialogComponent } from './consultorio-delete-dialog.component';
import { consultorioRoute, consultorioPopupRoute } from './consultorio.route';

const ENTITY_STATES = [...consultorioRoute, ...consultorioPopupRoute];

@NgModule({
  imports: [Consultorio5SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ConsultorioComponent,
    ConsultorioDetailComponent,
    ConsultorioUpdateComponent,
    ConsultorioDeleteDialogComponent,
    ConsultorioDeletePopupComponent
  ],
  entryComponents: [ConsultorioDeleteDialogComponent]
})
export class Consultorio5ConsultorioModule {}
