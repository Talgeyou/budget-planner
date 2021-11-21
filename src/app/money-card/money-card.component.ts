import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConsumptionType } from '../types/consumption.type';
import { RevenueType } from '../types/revenue.type';

@Component({
  selector: 'app-money-card',
  templateUrl: './money-card.component.html',
  styleUrls: ['./money-card.component.scss'],
})
export class MoneyCardComponent implements OnInit {
  @Input() moneyCard: RevenueType | ConsumptionType | undefined;
  @Input() type: 'consumptions' | 'revenues' | undefined;
  @Output() onDelete = new EventEmitter<number>();

  constructor() {}

  deleteMoneyCard() {
    if (this.moneyCard !== undefined && this.type !== undefined) {
      const revenuesString = window.localStorage.getItem(
        this.type === 'revenues'
          ? 'bp__Revenues'
          : this.type === 'consumptions'
          ? 'bp__Consumptions'
          : ''
      );
      const revenues =
        revenuesString !== null ? JSON.parse(revenuesString) : [];
      window.localStorage.setItem(
        this.type === 'revenues'
          ? 'bp__Revenues'
          : this.type === 'consumptions'
          ? 'bp__Consumptions'
          : '',
        JSON.stringify(
          revenues.filter((moneyCard: RevenueType | ConsumptionType) => {
            return (
              this.moneyCard === undefined || moneyCard.id !== this.moneyCard.id
            );
          })
        )
      );
      this.onDelete.emit(this.moneyCard.id);
    }
  }

  ngOnInit(): void {}
}
