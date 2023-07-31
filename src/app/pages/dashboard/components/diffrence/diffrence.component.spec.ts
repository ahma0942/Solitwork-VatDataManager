import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffrenceComponent } from './diffrence.component';

describe('DiffrenceComponent', () => {
  let component: DiffrenceComponent;
  let fixture: ComponentFixture<DiffrenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiffrenceComponent]
    });
    fixture = TestBed.createComponent(DiffrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
