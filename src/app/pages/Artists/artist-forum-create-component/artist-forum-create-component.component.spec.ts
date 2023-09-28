import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistForumCreateComponentComponent } from './artist-forum-create-component.component';

describe('ArtistForumCreateComponentComponent', () => {
  let component: ArtistForumCreateComponentComponent;
  let fixture: ComponentFixture<ArtistForumCreateComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistForumCreateComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistForumCreateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
