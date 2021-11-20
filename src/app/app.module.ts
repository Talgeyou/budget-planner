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
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RevenuesListComponent } from './revenues-list/revenues-list.component';
import { RevenueFormComponent } from './revenue-form/revenue-form.component';
import { RevenueComponent } from './revenue/revenue.component';

@NgModule({
  declarations: [AppComponent, ConsumptionComponent, ConsumptionFormComponent, ConsumptionsListComponent, MoneyCardComponent, SidebarComponent, DashboardComponent, RevenuesListComponent, RevenueFormComponent, RevenueComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
