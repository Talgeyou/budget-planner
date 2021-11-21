import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTotalComponent } from './money-total.component';

describe('MoneyCardComponent', () => {
  let component: MoneyTotalComponent;
  let fixture: ComponentFixture<MoneyTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoneyTotalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
