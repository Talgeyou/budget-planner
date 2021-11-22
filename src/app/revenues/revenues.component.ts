import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../currency.service';
import { RevenuesService } from '../revenues.service';
import { RevenueType } from '../types/revenue.type';

@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.scss'],
})
export class RevenuesComponent implements OnInit {
  revenues: RevenueType[] = [];
  totalTitle: string = 'Total';
  totalValues: {
    RUB: number;
    USD: number;
    EUR: number;
  } = {
    RUB: 0,
    USD: 0,
    EUR: 0,
  };
  totalPeriod: 'Daily' | 'Monthly' | 'Annualy' = 'Monthly';
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

  currencyServiceSubscription: Subscription | undefined;

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

  handleRevenueAdd(newRevenues: RevenueType[]) {
    this.revenues = [...newRevenues];
  }

  handleRevenuesChange(newRevenues: RevenueType[]) {
    this.revenues = [...newRevenues];
    this.calculateTotal();
  }

  calculateTotal() {
    if (this.currencyServiceSubscription !== undefined) {
      this.currencyServiceSubscription.unsubscribe();
    }
    this.currencyServiceSubscription = this.currencyService
      .getCurrencyRates()
      .subscribe(
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
          this.totalValues = this.revenuesService.calculateAllRevenues(
            this.revenues,
            this.exchangeRates
          );
        }
      );
  }

  ngOnInit(): void {
    this.calculateTotal();
  }
}
