import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RevenueType } from '../types/revenue.type';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss'],
})
export class RevenueComponent implements OnInit {
  @Input() revenue: RevenueType | undefined;
  @Output() onDelete = new EventEmitter<number>();

  constructor() {}

  deleteRevenue() {
    if (this.revenue !== undefined) {
      const revenuesString = window.localStorage.getItem('bp__Revenues');
      const revenues =
        revenuesString !== null ? JSON.parse(revenuesString) : [];
      window.localStorage.setItem(
        'bp__Revenues',
        JSON.stringify(
          revenues.filter((item: RevenueType) => {
            return this.revenue === undefined || item.id !== this.revenue.id;
          })
        )
      );
      this.onDelete.emit(this.revenue.id);
    }
  }

  ngOnInit(): void {}
}
