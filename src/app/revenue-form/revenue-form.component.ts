import { Component, OnInit } from '@angular/core';
import { CurrencyEnum, PeriodsEnum } from '../types/revenue.type';
import { RevenueType } from '../types/revenue.type';

@Component({
  selector: 'app-revenue-form',
  templateUrl: './revenue-form.component.html',
  styleUrls: ['./revenue-form.component.scss'],
})
export class RevenueFormComponent implements OnInit {
  name: string = '';
  currency: CurrencyEnum = CurrencyEnum.RUB;
  value: number = 0;
  period: PeriodsEnum = PeriodsEnum.MONTHLY;
  addRevenue() {
    if (
      this.name !== undefined &&
      this.name.length > 0 &&
      Object.values(CurrencyEnum).includes(this.currency) &&
      Object.values(PeriodsEnum).includes(this.period) &&
      this.value !== undefined &&
      this.value > 0
    ) {
      const revenuesString = window.localStorage.getItem('bp__Revenues');
      const revenues: RevenueType[] =
        revenuesString !== null ? JSON.parse(revenuesString) : [];
      const id =
        revenues && revenues.length > 0
          ? +revenues[revenues.length - 1].id + 1
          : 0;
      window.localStorage.setItem(
        'bp__Revenues',
        JSON.stringify([
          ...revenues,
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
