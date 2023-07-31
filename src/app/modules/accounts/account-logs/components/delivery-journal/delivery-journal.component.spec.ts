import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryJournalComponent } from './delivery-journal.component';

describe('DeliveryJournalComponent', () => {
  let component: DeliveryJournalComponent;
  let fixture: ComponentFixture<DeliveryJournalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryJournalComponent]
    });
    fixture = TestBed.createComponent(DeliveryJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
