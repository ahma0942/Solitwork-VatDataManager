import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingTypeComponent } from './posting-type.component';

describe('PostingTypeComponent', () => {
  let component: PostingTypeComponent;
  let fixture: ComponentFixture<PostingTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostingTypeComponent]
    });
    fixture = TestBed.createComponent(PostingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
