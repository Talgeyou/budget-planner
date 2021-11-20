import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, switchMap, tap } from 'rxjs';
import { CurrencyType } from './types/currency.type';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  apiUrl: string = 'https://api.frankfurter.app/';

  exchangeRates = {
    USD: {
      RUB: 0,
      EUR: 0,
    },
    RUB: {
      USD: 0,
      EUR: 0,
    },
    EUR: {
      USD: 0,
      RUB: 0,
    },
  };

  constructor(private http: HttpClient) {
    this.getCurrencyRates();
  }

  exchangeCurrency(
    value: number,
    fromCurrency: 'USD' | 'RUB' | 'EUR',
    toCurrency: 'USD' | 'RUB' | 'EUR',
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
    if (value !== undefined && fromCurrency !== undefined && toCurrency) {
      let rate = 0;
      switch (fromCurrency) {
        case 'USD':
          rate =
            toCurrency === 'RUB'
              ? rates.RUB.USD
              : toCurrency === 'EUR'
              ? rates.EUR.RUB
              : 1;
          break;
        case 'RUB':
          rate =
            toCurrency === 'USD'
              ? rates.USD.RUB
              : toCurrency === 'EUR'
              ? rates.EUR.RUB
              : 1;
          break;
        case 'EUR':
          rate =
            toCurrency === 'RUB'
              ? rates.RUB.EUR
              : toCurrency === 'USD'
              ? rates.USD.EUR
              : 1;
          break;
        default:
          rate = 1;
      }
      return value / rate;
    }
    return 0;
  }

  getCurrencyRates() {
    return this.http.get(this.apiUrl + 'latest?base=USD').pipe(
      tap(
        (dataUSD: any) =>
          (this.exchangeRates = {
            ...this.exchangeRates,
            USD: {
              RUB: dataUSD.rates.RUB ? dataUSD.rates.RUB : 0,
              EUR: dataUSD.rates.EUR ? dataUSD.rates.EUR : 0,
            },
          })
      ),
      concatMap(() => this.http.get(this.apiUrl + 'latest?base=RUB')),
      tap((dataRUB: any) => {
        this.exchangeRates = {
          ...this.exchangeRates,
          RUB: {
            USD: dataRUB.rates.USD ? dataRUB.rates.USD : 0,
            EUR: dataRUB.rates.EUR ? dataRUB.rates.EUR : 0,
          },
        };
      }),
      concatMap(() => this.http.get(this.apiUrl + 'latest?base=EUR')),
      tap((dataEUR: any) => {
        return (this.exchangeRates = {
          ...this.exchangeRates,
          EUR: {
            USD: dataEUR.rates.USD ? dataEUR.rates.USD : 0,
            RUB: dataEUR.rates.RUB ? dataEUR.rates.RUB : 0,
          },
        });
      }),
      map(() => this.exchangeRates)
    );
  }
}
