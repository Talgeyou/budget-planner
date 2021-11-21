import { Component, Input, OnInit } from '@angular/core';
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

  constructor() {}

  handleMoneyCardDelete(moneyCardId: number) {
    this.moneyCards = this.moneyCards.filter(
      (moneyCard: RevenueType | ConsumptionType) => moneyCard.id !== moneyCardId
    );
  }

  ngOnInit(): void {}
}
