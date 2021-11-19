import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumptionFormComponent } from './consumption-form/consumption-form.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
