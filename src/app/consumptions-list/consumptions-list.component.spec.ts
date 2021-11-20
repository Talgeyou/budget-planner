import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionsListComponent } from './consumptions-list.component';

describe('ConsumptionsListComponent', () => {
  let component: ConsumptionsListComponent;
  let fixture: ComponentFixture<ConsumptionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumptionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
