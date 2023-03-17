import { CurrencyEnum, PeriodsEnum } from './money.enum';

export type ConsumptionType = {
    id: number;
    name: string;
    value: number;
    currency: CurrencyEnum;
    period: PeriodsEnum;
};
