export enum CurrencyEnum {
  RUB = 'RUB',
  USD = 'USD',
  EUR = 'EUR',
}

export enum PeriodsEnum {
  DAILY = 'Daily',
  MONTHLY = 'Monthly',
  ANNUALY = 'Annualy',
}

export type ConsumptionType = {
  id: number;
  name: string;
  value: number;
  currency: CurrencyEnum;
  period: PeriodsEnum;
};
