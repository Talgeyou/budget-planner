import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyCardsListComponent } from './money-cards-list.component';

describe('MoneyCardsListComponent', () => {
  let component: MoneyCardsListComponent;
  let fixture: ComponentFixture<MoneyCardsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyCardsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyCardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
