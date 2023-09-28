import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumaddcommentComponent } from './forumaddcomment.component';

describe('ForumaddcommentComponent', () => {
  let component: ForumaddcommentComponent;
  let fixture: ComponentFixture<ForumaddcommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumaddcommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumaddcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
