import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { ConsumptionFormComponent } from './consumption-form/consumption-form.component';
import { FormsModule } from '@angular/forms';
import { ConsumptionsListComponent } from './consumptions-list/consumptions-list.component';
import { MoneyCardComponent } from './money-card/money-card.component';

@NgModule({
  declarations: [AppComponent, ConsumptionComponent, ConsumptionFormComponent, ConsumptionsListComponent, MoneyCardComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
