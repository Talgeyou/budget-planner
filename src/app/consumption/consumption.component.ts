import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConsumptionType } from '../types/consumption.type';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss'],
})
export class ConsumptionComponent implements OnInit {
  @Input() consumption: ConsumptionType | undefined;
  @Output() onDelete = new EventEmitter<number>();

  constructor() {}

  deleteConsumption() {
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
      this.onDelete.emit(this.consumption.id);
    }
  }

  ngOnInit(): void {}
}
