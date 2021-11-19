import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionFormComponent } from './consumption-form.component';

describe('ConsumptionFormComponent', () => {
  let component: ConsumptionFormComponent;
  let fixture: ComponentFixture<ConsumptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumptionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
