import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import {
  ConsumptionType,
  CurrencyEnum,
  PeriodsEnum,
} from '../types/consumption.type';
import { CurrencyType } from '../types/currency.type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  income: number = 0;
  incomeCurrency: 'RUB' | 'USD' | 'EUR' = 'RUB';
  incomePeriod: 'Daily' | 'Monthly' | 'Annualy' = 'Monthly';
  moneyLeftPeriod: 'Daily' | 'Monthly' | 'Annualy' = 'Monthly';
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

  currencyExchangeRates = {
    USD: {
      RUB: 0,
      EUR: 0,
    },
    RUB: {
      USD: 0,
      EUR: 0,
    },
    EUR: {
      RUB: 0,
      USD: 0,
    },
  };

  constructor(private currencyService: CurrencyService) {
    const consumptions = window.localStorage.getItem('bp__Consumptions');
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
                  ? (item2.value * 365) / 12
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
                  ? (item2.value * 365) / 12
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
                  ? (item2.value * 365) / 12
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

  exchangeCurrency(value?: number, rate?: number) {
    if (value !== undefined && rate !== undefined) {
      return value / rate;
    }
    return 0;
  }

  calculateLeftMoney(
    incomeValue: number,
    incomeCurrency: 'RUB' | 'USD' | 'EUR',
    incomePeriod: 'Daily' | 'Monthly' | 'Annualy',
    period: 'Daily' | 'Monthly' | 'Annualy'
  ) {
    switch (incomeCurrency) {
      case 'RUB':
        this.leftRUB =
          incomePeriod === 'Daily'
            ? (incomeValue * 365) / 12 - this.totalRUB
            : incomePeriod === 'Annualy'
            ? incomeValue / 12 - this.totalRUB
            : incomeValue - this.totalRUB;
        this.leftUSD = this.exchangeCurrency(
          this.leftRUB,
          this.currencyExchangeRates.USD.RUB
        );
        this.leftEUR = this.exchangeCurrency(
          this.leftRUB,
          this.currencyExchangeRates.EUR.RUB
        );
        break;
      case 'USD':
        this.leftUSD =
          incomePeriod === 'Daily'
            ? (incomeValue * 365) / 12 - this.totalUSD
            : incomePeriod === 'Annualy'
            ? incomeValue / 12 - this.totalUSD
            : incomeValue - this.totalUSD;
        this.leftRUB = this.exchangeCurrency(
          this.leftUSD,
          this.currencyExchangeRates.RUB.USD
        );
        this.leftEUR = this.exchangeCurrency(
          this.leftUSD,
          this.currencyExchangeRates.EUR.USD
        );
        break;
      case 'EUR':
        this.leftEUR =
          incomePeriod === 'Daily'
            ? (incomeValue * 365) / 12 - this.totalEUR
            : incomePeriod === 'Annualy'
            ? incomeValue / 12 - this.totalEUR
            : incomeValue - this.totalEUR;
        this.leftUSD = this.exchangeCurrency(
          this.leftEUR,
          this.currencyExchangeRates.USD.EUR
        );
        this.leftRUB = this.exchangeCurrency(
          this.leftEUR,
          this.currencyExchangeRates.RUB.EUR
        );
        break;
      default:
        this.leftRUB = 0;
        this.leftUSD = 0;
        this.leftEUR = 0;
        break;
    }

    switch (period) {
      case 'Daily':
        this.leftRUB = (this.leftRUB * 12) / 365;
        this.leftUSD = (this.leftUSD * 12) / 365;
        this.leftEUR = (this.leftEUR * 12) / 365;
        break;
      case 'Annualy':
        this.leftRUB = this.leftRUB * 12;
        this.leftUSD = this.leftUSD * 12;
        this.leftEUR = this.leftEUR * 12;
        break;
    }
  }

  onIncomeChange(event: any) {
    if (event.target.value !== undefined) {
      this.calculateLeftMoney(
        +event.target.value,
        this.incomeCurrency,
        this.incomePeriod,
        this.moneyLeftPeriod
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
        this.incomePeriod,
        this.moneyLeftPeriod
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
        event.target.value,
        this.moneyLeftPeriod
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

  onMoneyLeftPeriodChange(event: any) {
    if (event.target.value !== undefined) {
      this.calculateLeftMoney(
        this.income,
        this.incomeCurrency,
        this.incomePeriod,
        event.target.value
      );
    }
  }

  ngOnInit() {
    this.currencyService.getCurrencyRates().subscribe(
      (data: {
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
        this.currencyExchangeRates = { ...data };
        this.totalUSD =
          this.rawTotalUSD +
          this.exchangeCurrency(this.rawTotalRUB, data.USD.RUB) +
          this.exchangeCurrency(this.rawTotalEUR, data.USD.EUR);
        this.totalRUB =
          this.rawTotalRUB +
          this.exchangeCurrency(this.rawTotalUSD, data.RUB.USD) +
          this.exchangeCurrency(this.rawTotalEUR, data.RUB.EUR);
        this.totalEUR =
          this.rawTotalEUR +
          this.exchangeCurrency(this.rawTotalRUB, data.EUR.RUB) +
          this.exchangeCurrency(this.rawTotalUSD, data.EUR.USD);
        this.calculateLeftMoney(
          this.income,
          this.incomeCurrency,
          this.incomePeriod,
          this.moneyLeftPeriod
        );
      }
    );
  }
}
