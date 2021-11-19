import { Component, Input, OnInit } from '@angular/core';
import { ConsumptionType } from '../types/consumption.type';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss'],
})
export class ConsumptionComponent implements OnInit {
  @Input() consumption: ConsumptionType | undefined;

  constructor() {}

  deleteConsumption() {
    console.log('deleting...');
    if (this.consumption !== undefined) {
      const consumptionsString =
        window.localStorage.getItem('bp__Consumptions');
      const consumptions =
        consumptionsString !== null ? JSON.parse(consumptionsString) : [];
      window.localStorage.setItem(
        'bp__Consumptions',
        JSON.stringify(
          consumptions.filter((item: ConsumptionType) => {
            return (
              this.consumption === undefined || item.id !== this.consumption.id
            );
          })
        )
      );
      console.log('deleted');
      location.reload();
    }
  }

  ngOnInit(): void {}
}
