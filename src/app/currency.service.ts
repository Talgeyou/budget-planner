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

  constructor(private http: HttpClient) {}

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
