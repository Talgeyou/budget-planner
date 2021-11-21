import { CurrencyEnum, PeriodsEnum } from './money.enum';

export type RevenueType = {
  id: number;
  name: string;
  value: number;
  currency: CurrencyEnum;
  period: PeriodsEnum;
};
