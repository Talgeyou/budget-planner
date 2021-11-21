import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ConsumptionType } from '../types/consumption.type';
import { CurrencyEnum, PeriodsEnum, RevenueType } from '../types/revenue.type';

@Component({
  selector: 'app-money-card-form',
  templateUrl: './money-card-form.component.html',
  styleUrls: ['./money-card-form.component.scss'],
})
export class MoneyCardFormComponent implements OnInit {
  @Input() type: 'revenues' | 'consumptions' | undefined;
  moneyCard: RevenueType | ConsumptionType = {
    id: -1,
    name: '',
    value: NaN,
    currency: CurrencyEnum.RUB,
    period: PeriodsEnum.MONTHLY,
  };

  @Output() onMoneyCardAdd = new EventEmitter<
    RevenueType[] | ConsumptionType[]
  >();

  constructor() {}

  addMoneyCard() {
    if (this.type !== undefined) {
      const localVariableName =
        this.type === 'revenues'
          ? 'bp__Revenues'
          : this.type === 'consumptions'
          ? 'bp__Consumptions'
          : '';
      const oldMoneyCardsString =
        window.localStorage.getItem(localVariableName);
      const oldMoneyCards =
        oldMoneyCardsString !== null &&
        Array.isArray(JSON.parse(oldMoneyCardsString))
          ? JSON.parse(oldMoneyCardsString)
          : [];
      const newMoneyCards = [
        ...oldMoneyCards,
        {
          ...this.moneyCard,
          id:
            oldMoneyCards[oldMoneyCards.length - 1] !== undefined
              ? +oldMoneyCards[oldMoneyCards.length - 1].id + 1
              : 0,
        },
      ];
      this.onMoneyCardAdd.emit(newMoneyCards);
      window.localStorage.setItem(
        localVariableName,
        JSON.stringify(newMoneyCards)
      );

      this.moneyCard = {
        id: -1,
        name: '',
        value: 0,
        currency: CurrencyEnum.RUB,
        period: PeriodsEnum.MONTHLY,
      };
    }
  }

  ngOnInit(): void {}
}
