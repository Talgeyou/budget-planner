import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConsumptionsService } from '../consumptions.service';
import { CurrencyService } from '../currency.service';
import { ConsumptionType } from '../types/consumption.type';

@Component({
    selector: 'app-consumptions',
    templateUrl: './consumptions.component.html',
    styleUrls: ['./consumptions.component.scss'],
})
export class ConsumptionsComponent implements OnInit {
    consumptions: ConsumptionType[] = [];
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
        private consumptionsService: ConsumptionsService,
        private currencyService: CurrencyService,
    ) {
        const consumptions = window.localStorage.getItem('bp__Consumptions');
        this.consumptions =
            consumptions !== null ? JSON.parse(consumptions) : [];
    }

    handleConsumptionDelete(consumptionId: number) {
        this.consumptions = this.consumptions.filter(
            (consumption: ConsumptionType) => consumption.id !== consumptionId,
        );
        this.calculateTotal();
    }

    handleConsumptionAdd(newConsumptions: ConsumptionType[]) {
        this.consumptions = [...newConsumptions];
        this.calculateTotal();
    }

    handleConsumptionsChange(newConsumptions: ConsumptionType[]) {
        this.consumptions = [...newConsumptions];
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
                    this.totalValues =
                        this.consumptionsService.calculateAllConsumptions(
                            this.consumptions,
                            this.exchangeRates,
                        );
                },
            );
    }

    ngOnInit(): void {
        this.calculateTotal();
    }
}
