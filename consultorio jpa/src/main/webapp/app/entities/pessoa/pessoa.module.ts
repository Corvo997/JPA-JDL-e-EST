import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Consultorio5SharedModule } from 'app/shared/shared.module';
import { PessoaComponent } from './pessoa.component';
import { PessoaDetailComponent } from './pessoa-detail.component';
import { PessoaUpdateComponent } from './pessoa-update.component';
import { PessoaDeletePopupComponent, PessoaDeleteDialogComponent } from './pessoa-delete-dialog.component';
import { pessoaRoute, pessoaPopupRoute } from './pessoa.route';

const ENTITY_STATES = [...pessoaRoute, ...pessoaPopupRoute];

@NgModule({
  imports: [Consultorio5SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PessoaComponent, PessoaDetailComponent, PessoaUpdateComponent, PessoaDeleteDialogComponent, PessoaDeletePopupComponent],
  entryComponents: [PessoaDeleteDialogComponent]
})
export class Consultorio5PessoaModule {}
