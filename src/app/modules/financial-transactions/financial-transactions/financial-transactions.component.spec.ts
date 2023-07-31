import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialTransactionsComponent } from './financial-transactions.component';

describe('FinancialTransactionsComponent', () => {
  let component: FinancialTransactionsComponent;
  let fixture: ComponentFixture<FinancialTransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialTransactionsComponent]
    });
    fixture = TestBed.createComponent(FinancialTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
