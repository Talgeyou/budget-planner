import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyCardFormComponent } from './money-card-form.component';

describe('MoneyCardFormComponent', () => {
  let component: MoneyCardFormComponent;
  let fixture: ComponentFixture<MoneyCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyCardFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
