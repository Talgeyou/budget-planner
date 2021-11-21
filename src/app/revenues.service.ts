import { Injectable } from '@angular/core';
import { CurrencyService } from './currency.service';
import { CurrencyEnum, PeriodsEnum } from './types/money.enum';
import { RevenueType } from './types/revenue.type';

@Injectable({
  providedIn: 'root',
})
export class RevenuesService {
  constructor(private currencyService: CurrencyService) {}

  calculateAllRevenues(
    revenues: RevenueType[],
    rates: {
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
    }
  ) {
    const totalRevenuesRUB = revenues.reduce(
      (totalRevenue: RevenueType, currentRevenue: RevenueType) => {
        const currentValue =
          currentRevenue.period === 'Daily'
            ? (currentRevenue.value * 365) / 12
            : currentRevenue.period === 'Annualy'
            ? currentRevenue.value / 12
            : currentRevenue.value;
        if (currentRevenue.currency === 'RUB') {
          return {
            ...totalRevenue,
            value: totalRevenue.value + currentValue,
          };
        } else {
          return {
            ...totalRevenue,
            value:
              totalRevenue.value +
              this.currencyService.exchangeCurrency(
                currentValue,
                currentRevenue.currency,
                'RUB',
                rates
              ),
          };
        }
      },
      {
        id: -1,
        currency: CurrencyEnum.RUB,
        name: '',
        value: 0,
        period: PeriodsEnum.MONTHLY,
      }
    ).value;

    return {
      RUB: totalRevenuesRUB,
      USD: this.currencyService.exchangeCurrency(
        totalRevenuesRUB,
        'RUB',
        'USD',
        rates
      ),
      EUR: this.currencyService.exchangeCurrency(
        totalRevenuesRUB,
        'RUB',
        'EUR',
        rates
      ),
    };
  }
}
