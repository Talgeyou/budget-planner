import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConsumptionType } from '../types/consumption.type';
import { RevenueType } from '../types/revenue.type';

@Component({
  selector: 'app-money-cards-list',
  templateUrl: './money-cards-list.component.html',
  styleUrls: ['./money-cards-list.component.scss'],
})
export class MoneyCardsListComponent implements OnInit {
  @Input() moneyCards: RevenueType[] | ConsumptionType[] = [];
  @Input() type: 'revenues' | 'consumptions' | undefined;
  @Output() onMoneyCardsChange = new EventEmitter<
    RevenueType[] | ConsumptionType[]
  >();

  constructor() {}

  handleMoneyCardDelete(moneyCardId: number) {
    this.moneyCards = this.moneyCards.filter(
      (moneyCard: RevenueType | ConsumptionType) => moneyCard.id !== moneyCardId
    );
    this.onMoneyCardsChange.emit(this.moneyCards);
  }

  handleMoneyCardEdit(newMoneyCards: RevenueType[] | ConsumptionType[]) {
    this.moneyCards = [...newMoneyCards];
    this.onMoneyCardsChange.emit(this.moneyCards);
  }

  ngOnInit(): void {}
}
