import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVatRatesComponent } from './add-edit-vat-rates.component';

describe('AddEditVatRatesComponent', () => {
  let component: AddEditVatRatesComponent;
  let fixture: ComponentFixture<AddEditVatRatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditVatRatesComponent]
    });
    fixture = TestBed.createComponent(AddEditVatRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
