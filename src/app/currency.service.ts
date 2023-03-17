import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, Observable, tap } from 'rxjs';

type ApiData = {
  info: {
    rate: number;
  };
};

export type ExchangeRates = {
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
};

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  apiUrl: string = 'https://api.exchangerate.host/convert';

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
    rates: ExchangeRates
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

  getCurrencyRates(): Observable<ExchangeRates> {
    return this.http
      .get<ApiData>(this.apiUrl + '?from=USD&to=EUR')
      .pipe(
        tap((dataUSDtoEUR) => {
          this.exchangeRates = {
            ...this.exchangeRates,
            USD: {
              ...this.exchangeRates.USD,
              EUR: dataUSDtoEUR.info.rate ?? 0,
            },
          };
        }),
        concatMap(() =>
          this.http.get<ApiData>(this.apiUrl + '?from=USD&to=RUB')
        ),
        tap((dataUSDtoRUB) => {
          this.exchangeRates = {
            ...this.exchangeRates,
            USD: {
              ...this.exchangeRates.USD,
              RUB: dataUSDtoRUB.info.rate ?? 0,
            },
          };
        }),
        concatMap(() =>
          this.http.get<ApiData>(this.apiUrl + '?from=EUR&to=USD')
        ),
        tap((dataEURtoUSD) => {
          this.exchangeRates = {
            ...this.exchangeRates,
            EUR: {
              ...this.exchangeRates.EUR,
              USD: dataEURtoUSD.info.rate ?? 0,
            },
          };
        }),
        concatMap(() =>
          this.http.get<ApiData>(this.apiUrl + '?from=EUR&to=RUB')
        ),
        tap((dataEURtoRUB) => {
          this.exchangeRates = {
            ...this.exchangeRates,
            EUR: {
              ...this.exchangeRates.EUR,
              RUB: dataEURtoRUB.info.rate ?? 0,
            },
          };
        }),
        concatMap(() =>
          this.http.get<ApiData>(this.apiUrl + '?from=RUB&to=USD')
        ),
        tap((dataRUBtoUSD) => {
          this.exchangeRates = {
            ...this.exchangeRates,
            RUB: {
              ...this.exchangeRates.RUB,
              USD: dataRUBtoUSD.info.rate ?? 0,
            },
          };
        }),
        concatMap(() =>
          this.http.get<ApiData>(this.apiUrl + '?from=RUB&to=EUR')
        ),
        tap((dataRUBtoEUR) => {
          this.exchangeRates = {
            ...this.exchangeRates,
            RUB: {
              ...this.exchangeRates.RUB,
              USD: dataRUBtoEUR.info.rate ?? 0,
            },
          };
        })
      )
      .pipe(map(() => this.exchangeRates));
  }
}
