import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { RevenuesService } from '../revenues.service';
import { RevenueType } from '../types/revenue.type';

@Component({
  selector: 'app-revenues-list',
  templateUrl: './revenues-list.component.html',
  styleUrls: ['./revenues-list.component.scss'],
})
export class RevenuesListComponent implements OnInit {
  revenues: RevenueType[] = [];
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
    private revenuesService: RevenuesService,
    private currencyService: CurrencyService
  ) {
    const revenues = window.localStorage.getItem('bp__Revenues');
    this.revenues = revenues !== null ? JSON.parse(revenues) : [];
  }

  handleRevenueDelete(revenueId: number) {
    this.revenues = this.revenues.filter(
      (revenue: RevenueType) => revenue.id !== revenueId
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
        this.moneyCardValues = this.revenuesService.calculateAllRevenues(
          this.revenues,
          this.exchangeRates
        );
      }
    );
  }
}
