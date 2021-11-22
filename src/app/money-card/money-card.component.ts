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
  @Output() onEdit = new EventEmitter<RevenueType[] | ConsumptionType[]>();
  editMode: boolean = false;

  constructor() {}

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode === false) {
      if (this.moneyCard !== undefined && this.type !== undefined) {
        const moneyCardsString = window.localStorage.getItem(
          this.type === 'revenues'
            ? 'bp__Revenues'
            : this.type === 'consumptions'
            ? 'bp__Consumptions'
            : ''
        );
        const moneyCards =
          moneyCardsString !== null ? JSON.parse(moneyCardsString) : [];
        const newMoneyCards = moneyCards.map(
          (moneyCard: RevenueType | ConsumptionType) =>
            moneyCard.id === this.moneyCard?.id ? this.moneyCard : moneyCard
        );
        window.localStorage.setItem(
          this.type === 'revenues'
            ? 'bp__Revenues'
            : this.type === 'consumptions'
            ? 'bp__Consumptions'
            : '',
          JSON.stringify(newMoneyCards)
        );
        this.onEdit.emit(newMoneyCards);
      }
    }
  }

  deleteMoneyCard() {
    if (this.moneyCard !== undefined && this.type !== undefined) {
      const moneyCardsString = window.localStorage.getItem(
        this.type === 'revenues'
          ? 'bp__Revenues'
          : this.type === 'consumptions'
          ? 'bp__Consumptions'
          : ''
      );
      const moneyCards =
        moneyCardsString !== null ? JSON.parse(moneyCardsString) : [];
      window.localStorage.setItem(
        this.type === 'revenues'
          ? 'bp__Revenues'
          : this.type === 'consumptions'
          ? 'bp__Consumptions'
          : '',
        JSON.stringify(
          moneyCards.filter((moneyCard: RevenueType | ConsumptionType) => {
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
