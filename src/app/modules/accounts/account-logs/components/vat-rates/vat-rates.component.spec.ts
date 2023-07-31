import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatRatesComponent } from './vat-rates.component';

describe('VatRatesComponent', () => {
  let component: VatRatesComponent;
  let fixture: ComponentFixture<VatRatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VatRatesComponent]
    });
    fixture = TestBed.createComponent(VatRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
