import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MoneyTotalComponent } from './money-total/money-total.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsumptionsComponent } from './consumptions/consumptions.component';
import { RevenuesComponent } from './revenues/revenues.component';
import { MoneyCardsListComponent } from './money-cards-list/money-cards-list.component';
import { MoneyCardComponent } from './money-card/money-card.component';
import { MoneyCardFormComponent } from './money-card-form/money-card-form.component';

@NgModule({
  declarations: [
    AppComponent,

    MoneyTotalComponent,
    SidebarComponent,
    DashboardComponent,
    ConsumptionsComponent,
    RevenuesComponent,
    MoneyCardsListComponent,
    MoneyCardComponent,
    MoneyCardFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
