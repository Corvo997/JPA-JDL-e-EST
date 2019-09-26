import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Consultorio5SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [Consultorio5SharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class Consultorio5HomeModule {}
