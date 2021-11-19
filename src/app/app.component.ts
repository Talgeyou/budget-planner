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
export class AppComponent implements OnInit {
  title: string = 'Budget Planner';

  income: number = 0;
  incomeCurrency: 'RUB' | 'USD' | 'EUR' = 'RUB';
  incomePeriod: 'Daily' | 'Monthly' | 'Annualy' = 'Monthly';
  leftRUB: number = 0;
  leftUSD: number = 0;
  leftEUR: number = 0;

  consumptions: ConsumptionType[] = [];
  currencyRates: CurrencyType | undefined = undefined;
  rawTotalRUB: number = 0;
  rawTotalUSD: number = 0;
  rawTotalEUR: number = 0;
  totalRUB: number = 0;
  totalUSD: number = 0;
  totalEUR: number = 0;

  USDRUBRate = 0;
  USDEURRate = 0;

  EURRUBRate = 0;
  EURUSDRate = 0;
  RUBUSDRate = 0;
  RUBEURRate = 0;

  constructor(private currencyService: CurrencyService) {
    const consumptions = window.localStorage.getItem('bp__Consumptions');
    console.log(consumptions);
    this.consumptions = consumptions !== null ? JSON.parse(consumptions) : [];
    const oldIncomeString = window.localStorage.getItem('bp__Income');
    const oldIncome =
      oldIncomeString !== null
        ? JSON.parse(oldIncomeString)
        : { value: 0, currency: 'RUB', period: 'Monthly' };
    this.income = oldIncome.value;
    this.incomeCurrency = oldIncome.currency;
    this.incomePeriod = oldIncome.period;

    this.rawTotalRUB = this.consumptions.reduce(
      (item1: ConsumptionType, item2: ConsumptionType) =>
        item1.currency === 'RUB' && item2.currency === 'RUB'
          ? {
              ...item2,
              value:
                item1.value +
                (item2.period === 'Daily'
                  ? item2.value * 30
                  : item2.period === 'Annualy'
                  ? item2.value / 12
                  : item2.value),
            }
          : item1,
      {
        id: -1,
        name: '',
        value: 0,
        currency: CurrencyEnum.RUB,
        period: PeriodsEnum.MONTHLY,
      }
    ).value;
    this.rawTotalUSD = this.consumptions.reduce(
      (item1: ConsumptionType, item2: ConsumptionType) =>
        item1.currency === 'USD' && item2.currency === 'USD'
          ? {
              ...item2,
              value:
                item1.value +
                (item2.period === 'Daily'
                  ? item2.value * 30
                  : item2.period === 'Annualy'
                  ? item2.value / 12
                  : item2.value),
            }
          : item1,
      {
        id: -1,
        name: '',
        value: 0,
        currency: CurrencyEnum.USD,
        period: PeriodsEnum.MONTHLY,
      }
    ).value;
    this.rawTotalEUR = this.consumptions.reduce(
      (item1: ConsumptionType, item2: ConsumptionType) =>
        item1.currency === 'EUR' && item2.currency === 'EUR'
          ? {
              ...item2,
              value:
                item1.value +
                (item2.period === 'Daily'
                  ? item2.value * 30
                  : item2.period === 'Annualy'
                  ? item2.value / 12
                  : item2.value),
            }
          : item1,
      {
        id: -1,
        name: '',
        value: 0,
        currency: CurrencyEnum.EUR,
        period: PeriodsEnum.MONTHLY,
      }
    ).value;
  }

  exchangeRates(value?: number, rate?: number) {
    if (value !== undefined && rate !== undefined) {
      return value / rate;
    }
    return 0;
  }

  calculateLeftMoney(
    value: number,
    currency: 'RUB' | 'USD' | 'EUR',
    period: 'Daily' | 'Monthly' | 'Annualy'
  ) {
    switch (currency) {
      case 'RUB':
        this.leftRUB =
          period === 'Daily'
            ? value * 30 - this.totalRUB
            : period === 'Annualy'
            ? value / 12 - this.totalRUB
            : value - this.totalRUB;
        this.leftUSD = this.exchangeRates(this.leftRUB, this.USDRUBRate);
        this.leftEUR = this.exchangeRates(this.leftRUB, this.EURRUBRate);
        break;
      case 'USD':
        this.leftUSD =
          period === 'Daily'
            ? value * 30 - this.totalUSD
            : period === 'Annualy'
            ? value / 12 - this.totalUSD
            : value - this.totalUSD;
        this.leftRUB = this.exchangeRates(this.leftUSD, this.RUBUSDRate);
        this.leftEUR = this.exchangeRates(this.leftUSD, this.EURUSDRate);
        break;
      case 'EUR':
        this.leftEUR =
          period === 'Daily'
            ? value * 30 - this.totalEUR
            : period === 'Annualy'
            ? value / 12 - this.totalEUR
            : value - this.totalEUR;
        this.leftUSD = this.exchangeRates(this.leftEUR, this.USDEURRate);
        this.leftRUB = this.exchangeRates(this.leftEUR, this.RUBEURRate);
        break;
      default:
        this.leftRUB = 0;
        this.leftUSD = 0;
        this.leftEUR = 0;
        break;
    }
  }

  onIncomeChange(event: any) {
    if (event.target.value !== undefined) {
      this.calculateLeftMoney(
        +event.target.value,
        this.incomeCurrency,
        this.incomePeriod
      );
      window.localStorage.setItem(
        'bp__Income',
        JSON.stringify({
          value: +event.target.value,
          currency: this.incomeCurrency,
          period: this.incomePeriod,
        })
      );
    }
  }

  onIncomeCurrencyChange(event: any) {
    if (event.target.value !== undefined) {
      this.calculateLeftMoney(
        this.income,
        event.target.value,
        this.incomePeriod
      );
      window.localStorage.setItem(
        'bp__Income',
        JSON.stringify({
          value: this.income,
          currency: event.target.value,
          period: this.incomePeriod,
        })
      );
    }
  }

  onIncomePeriodChange(event: any) {
    if (event.target.value !== undefined) {
      this.calculateLeftMoney(
        this.income,
        this.incomeCurrency,
        event.target.value
      );
      window.localStorage.setItem(
        'bp__Income',
        JSON.stringify({
          value: this.income,
          currency: this.incomeCurrency,
          period: event.target.value,
        })
      );
    }
  }

  ngOnInit() {
    this.currencyService
      .getCurrencyRates('USD')
      .subscribe((data: CurrencyType) => {
        this.USDRUBRate = data.rates.RUB !== undefined ? data.rates.RUB : 0;
        this.USDEURRate = data.rates.EUR !== undefined ? data.rates.EUR : 0;
        this.totalUSD =
          this.rawTotalUSD +
          this.exchangeRates(this.rawTotalRUB, data.rates.RUB) +
          this.exchangeRates(this.rawTotalEUR, data.rates.EUR);
      });
    this.calculateLeftMoney(
      this.income,
      this.incomeCurrency,
      this.incomePeriod
    );
    this.currencyService
      .getCurrencyRates('EUR')
      .subscribe((data: CurrencyType) => {
        this.EURRUBRate = data.rates.RUB !== undefined ? data.rates.RUB : 0;
        this.EURUSDRate = data.rates.USD !== undefined ? data.rates.USD : 0;
        this.totalEUR =
          this.rawTotalEUR +
          this.exchangeRates(this.rawTotalRUB, data.rates.RUB) +
          this.exchangeRates(this.rawTotalUSD, data.rates.USD);
        this.calculateLeftMoney(
          this.income,
          this.incomeCurrency,
          this.incomePeriod
        );
      });
    this.currencyService
      .getCurrencyRates('RUB')
      .subscribe((data: CurrencyType) => {
        this.RUBUSDRate = data.rates.USD !== undefined ? data.rates.USD : 0;
        this.RUBEURRate = data.rates.EUR !== undefined ? data.rates.EUR : 0;
        this.totalRUB =
          this.rawTotalRUB +
          this.exchangeRates(this.rawTotalUSD, data.rates.USD) +
          this.exchangeRates(this.rawTotalEUR, data.rates.EUR);
        this.calculateLeftMoney(
          this.income,
          this.incomeCurrency,
          this.incomePeriod
        );
      });
  }
}
