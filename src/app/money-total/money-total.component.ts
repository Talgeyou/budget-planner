import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-money-total',
  templateUrl: './money-total.component.html',
  styleUrls: ['./money-total.component.scss'],
})
export class MoneyTotalComponent implements OnInit {
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

  ngOnInit(): void {
    switch (this.period) {
      case 'Daily':
        this.usdValue =
          this.usdValue !== undefined ? (this.usdValue * 365) / 12 : 0;
        this.rubValue =
          this.rubValue !== undefined ? (this.rubValue * 365) / 12 : 0;
        this.eurValue =
          this.eurValue !== undefined ? (this.eurValue * 365) / 12 : 0;
        break;
      case 'Annualy':
        this.rubValue = this.rubValue !== undefined ? this.rubValue / 12 : 0;
        this.usdValue = this.usdValue !== undefined ? this.usdValue / 12 : 0;
        this.eurValue = this.eurValue !== undefined ? this.eurValue / 12 : 0;
    }
  }
}
