import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistEventEditModeComponent } from './artist-event-edit-mode.component';

describe('ArtistEventEditModeComponent', () => {
  let component: ArtistEventEditModeComponent;
  let fixture: ComponentFixture<ArtistEventEditModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistEventEditModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistEventEditModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
