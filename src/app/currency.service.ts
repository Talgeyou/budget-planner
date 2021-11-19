import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyType } from './types/currency.type';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  apiUrl: string = 'https://api.frankfurter.app/';

  constructor(private http: HttpClient) {}

  getCurrencyRates(base: string) {
    return this.http.get<CurrencyType>(this.apiUrl + `latest?from=${base}`);
  }
}
