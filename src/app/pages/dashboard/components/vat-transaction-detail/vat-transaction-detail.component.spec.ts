import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatTransactionDetailComponent } from './vat-transaction-detail.component';

describe('VatTransactionDetailComponent', () => {
  let component: VatTransactionDetailComponent;
  let fixture: ComponentFixture<VatTransactionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VatTransactionDetailComponent]
    });
    fixture = TestBed.createComponent(VatTransactionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
