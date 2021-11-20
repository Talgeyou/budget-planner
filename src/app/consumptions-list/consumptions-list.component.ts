import { Component, Input, OnInit } from '@angular/core';
import { ConsumptionType } from '../types/consumption.type';

@Component({
  selector: 'app-consumptions-list',
  templateUrl: './consumptions-list.component.html',
  styleUrls: ['./consumptions-list.component.scss'],
})
export class ConsumptionsListComponent implements OnInit {
  @Input() consumptions: ConsumptionType[] = [];

  constructor() {}

  handleConsumptionDelete(consumptionId: number) {
    this.consumptions = this.consumptions.filter(
      (consumption: ConsumptionType) => consumption.id !== consumptionId
    );
  }

  ngOnInit(): void {}
}
