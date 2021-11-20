import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-money-card',
  templateUrl: './money-card.component.html',
  styleUrls: ['./money-card.component.scss'],
})
export class MoneyCardComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() rubValue: number | undefined;
  @Input() usdValue: number | undefined;
  @Input() eurValue: number | undefined;
  @Input() period: 'Daily' | 'Monthly' | 'Annualy' = 'Monthly';

  constructor() {}

  onPeriodChange(event: any) {
    if (event?.target?.value !== undefined) {
      this.period = event.target.value;
    }
  }

  getValue(monthValue: number) {
    switch (this.period) {
      case 'Daily':
        return (monthValue * 12) / 365;
      case 'Monthly':
        return monthValue;
      case 'Annualy':
        return monthValue * 12;
    }
  }

  ngOnInit(): void {}
}
