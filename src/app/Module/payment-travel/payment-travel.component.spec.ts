import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTravelComponent } from './payment-travel.component';

describe('PaymentTravelComponent', () => {
  let component: PaymentTravelComponent;
  let fixture: ComponentFixture<PaymentTravelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentTravelComponent]
    });
    fixture = TestBed.createComponent(PaymentTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
