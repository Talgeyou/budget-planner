import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';
import {
  ConsumptionType,
  CurrencyEnum,
  PeriodsEnum,
} from './types/consumption.type';
import { CurrencyType } from './types/currency.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'Budget Planner';
}
