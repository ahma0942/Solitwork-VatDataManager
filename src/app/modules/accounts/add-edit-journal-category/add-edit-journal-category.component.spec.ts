import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditJournalCategoryComponent } from './add-edit-journal-category.component';

describe('AddEditJournalCategoryComponent', () => {
  let component: AddEditJournalCategoryComponent;
  let fixture: ComponentFixture<AddEditJournalCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditJournalCategoryComponent]
    });
    fixture = TestBed.createComponent(AddEditJournalCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
