import { Component, Input, OnInit } from '@angular/core';
import { ConsumptionsService } from '../consumptions.service';
import { CurrencyService } from '../currency.service';
import { ConsumptionType } from '../types/consumption.type';

@Component({
  selector: 'app-consumptions-list',
  templateUrl: './consumptions-list.component.html',
  styleUrls: ['./consumptions-list.component.scss'],
})
export class ConsumptionsListComponent implements OnInit {
  consumptions: ConsumptionType[] = [];
  moneyCardTitle: string = 'Total';
  moneyCardValues: {
    RUB: number;
    USD: number;
    EUR: number;
  } = {
    RUB: 0,
    USD: 0,
    EUR: 0,
  };
  moneyCardPeriod: 'Daily' | 'Monthly' | 'Annualy' = 'Monthly';
  exchangeRates: {
    USD: {
      RUB: number;
      EUR: number;
    };
    RUB: {
      USD: number;
      EUR: number;
    };
    EUR: {
      RUB: number;
      USD: number;
    };
  } = {
    USD: {
      RUB: 1,
      EUR: 1,
    },
    RUB: {
      USD: 1,
      EUR: 1,
    },
    EUR: {
      RUB: 1,
      USD: 1,
    },
  };

  constructor(
    private consumptionsService: ConsumptionsService,
    private currencyService: CurrencyService
  ) {
    const consumptions = window.localStorage.getItem('bp__Consumptions');
    this.consumptions = consumptions !== null ? JSON.parse(consumptions) : [];
  }

  handleConsumptionDelete(consumptionId: number) {
    this.consumptions = this.consumptions.filter(
      (consumption: ConsumptionType) => consumption.id !== consumptionId
    );
  }

  ngOnInit(): void {
    this.currencyService.getCurrencyRates().subscribe(
      (rates: {
        USD: {
          RUB: number;
          EUR: number;
        };
        RUB: {
          USD: number;
          EUR: number;
        };
        EUR: {
          RUB: number;
          USD: number;
        };
      }) => {
        this.exchangeRates = { ...rates };
        this.moneyCardValues =
          this.consumptionsService.calculateAllConsumptions(
            this.consumptions,
            this.exchangeRates
          );
      }
    );
  }
}
