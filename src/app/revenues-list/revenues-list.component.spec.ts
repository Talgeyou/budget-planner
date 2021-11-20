import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuesListComponent } from './revenues-list.component';

describe('RevenuesListComponent', () => {
  let component: RevenuesListComponent;
  let fixture: ComponentFixture<RevenuesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenuesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
