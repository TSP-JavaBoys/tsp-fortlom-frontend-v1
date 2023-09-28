import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPageNewComponent } from './forum-page-new.component';

describe('ForumPageNewComponent', () => {
  let component: ForumPageNewComponent;
  let fixture: ComponentFixture<ForumPageNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumPageNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumPageNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
