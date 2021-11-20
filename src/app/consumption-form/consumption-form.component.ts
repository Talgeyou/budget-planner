import { Component, OnInit } from '@angular/core';
import { ConsumptionType } from '../types/consumption.type';

@Component({
  selector: 'app-consumption-form',
  templateUrl: './consumption-form.component.html',
  styleUrls: ['./consumption-form.component.scss'],
})
export class ConsumptionFormComponent implements OnInit {
  name: string = '';
  currency: string = '';
  value: number = 0;
  period: string = '';
  addConsumption() {
    const consumptionsString = window.localStorage.getItem('bp__Consumptions');
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

  ngOnInit(): void {}
}
