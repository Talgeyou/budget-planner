import { Injectable } from '@angular/core';
import { CurrencyService } from './currency.service';
import { ConsumptionType } from './types/consumption.type';
import { CurrencyEnum, PeriodsEnum } from './types/money.enum';

@Injectable({
    providedIn: 'root',
})
export class ConsumptionsService {
    constructor(private currencyService: CurrencyService) {}

    calculateAllConsumptions(
        consumptions: ConsumptionType[],
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
        },
    ) {
        const totalConsumptionsRUB = consumptions.reduce(
            (
                totalConsumption: ConsumptionType,
                currentConsumption: ConsumptionType,
            ) => {
                const currentValue =
                    currentConsumption.period === 'Daily'
                        ? (currentConsumption.value * 365) / 12
                        : currentConsumption.period === 'Annualy'
                        ? currentConsumption.value / 12
                        : currentConsumption.value;
                if (currentConsumption.currency === 'RUB') {
                    return {
                        ...totalConsumption,
                        value: totalConsumption.value + currentValue,
                    };
                } else {
                    return {
                        ...totalConsumption,
                        value:
                            totalConsumption.value +
                            this.currencyService.exchangeCurrency(
                                currentValue,
                                currentConsumption.currency,
                                'RUB',
                                rates,
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
            },
        ).value;

        return {
            RUB: totalConsumptionsRUB,
            USD: this.currencyService.exchangeCurrency(
                totalConsumptionsRUB,
                'RUB',
                'USD',
                rates,
            ),
            EUR: this.currencyService.exchangeCurrency(
                totalConsumptionsRUB,
                'RUB',
                'EUR',
                rates,
            ),
        };
    }
}
