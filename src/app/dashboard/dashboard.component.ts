import { Component, OnInit } from '@angular/core';
import { ConsumptionsService } from '../consumptions.service';
import { RevenuesService } from '../revenues.service';
import { CurrencyService, ExchangeRates } from '../currency.service';
import { ConsumptionType } from '../types/consumption.type';
import { CurrencyType } from '../types/currency.type';
import { RevenueType } from '../types/revenue.type';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    consumptions: ConsumptionType[] = [];
    revenues: RevenueType[] = [];
    currencyRates: CurrencyType | undefined = undefined;

    totalConsumptions: { RUB: number; USD: number; EUR: number } = {
        RUB: 0,
        USD: 0,
        EUR: 0,
    };
    totalRevenues: { RUB: number; USD: number; EUR: number } = {
        RUB: 0,
        USD: 0,
        EUR: 0,
    };
    totalLeft: { RUB: number; USD: number; EUR: number } = {
        RUB: 0,
        USD: 0,
        EUR: 0,
    };

    currencyExchangeRates: ExchangeRates = {
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

    constructor(
        private currencyService: CurrencyService,
        private consumptionsService: ConsumptionsService,
        private revenuesService: RevenuesService,
    ) {
        const consumptions = window.localStorage.getItem('bp__Consumptions');
        this.consumptions =
            consumptions !== null ? JSON.parse(consumptions) : [];
        const revenues = window.localStorage.getItem('bp__Revenues');
        this.revenues = revenues !== null ? JSON.parse(revenues) : [];
    }

    calculateLeftMoney() {
        this.totalLeft = {
            RUB: this.totalRevenues.RUB - this.totalConsumptions.RUB,
            USD: this.totalRevenues.USD - this.totalConsumptions.USD,
            EUR: this.totalRevenues.EUR - this.totalConsumptions.EUR,
        };
    }

    ngOnInit() {
        this.currencyService.getCurrencyRates().subscribe((data) => {
            this.currencyExchangeRates = { ...data };
            console.log(data);
            console.log(this.currencyExchangeRates);

            this.totalConsumptions = {
                ...this.consumptionsService.calculateAllConsumptions(
                    this.consumptions,
                    this.currencyExchangeRates,
                ),
            };
            console.log(this.totalConsumptions);
            this.totalRevenues = {
                ...this.revenuesService.calculateAllRevenues(
                    this.revenues,
                    this.currencyExchangeRates,
                ),
            };
            console.log(this.totalRevenues);
            this.calculateLeftMoney();
        });
    }
}
