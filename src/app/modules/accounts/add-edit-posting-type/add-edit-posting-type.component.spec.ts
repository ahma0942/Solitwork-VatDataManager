import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPostingTypeComponent } from './add-edit-posting-type.component';

describe('AddEditPostingTypeComponent', () => {
  let component: AddEditPostingTypeComponent;
  let fixture: ComponentFixture<AddEditPostingTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditPostingTypeComponent]
    });
    fixture = TestBed.createComponent(AddEditPostingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
