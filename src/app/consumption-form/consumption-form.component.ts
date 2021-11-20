import { Component, OnInit } from '@angular/core';
import {
  ConsumptionType,
  CurrencyEnum,
  PeriodsEnum,
} from '../types/consumption.type';

@Component({
  selector: 'app-consumption-form',
  templateUrl: './consumption-form.component.html',
  styleUrls: ['./consumption-form.component.scss'],
})
export class ConsumptionFormComponent implements OnInit {
  name: string = '';
  currency: CurrencyEnum = CurrencyEnum.RUB;
  value: number = 0;
  period: PeriodsEnum = PeriodsEnum.MONTHLY;
  addConsumption() {
    if (
      this.name !== undefined &&
      this.name.length > 0 &&
      Object.values(CurrencyEnum).includes(this.currency) &&
      Object.values(PeriodsEnum).includes(this.period) &&
      this.value !== undefined &&
      this.value > 0
    ) {
      const consumptionsString =
        window.localStorage.getItem('bp__Consumptions');
      const consumptions: ConsumptionType[] =
        consumptionsString !== null ? JSON.parse(consumptionsString) : [];
      const id =
        consumptions && consumptions.length > 0
          ? +consumptions[consumptions.length - 1].id + 1
          : 0;
      window.localStorage.setItem(
        'bp__Consumptions',
        JSON.stringify([
          ...consumptions,
          {
            id,
            name: this.name,
            currency: this.currency,
            value: this.value,
            period: this.period,
          },
        ])
      );
      location.reload();
    }
  }

  ngOnInit(): void {}
}
