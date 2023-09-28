import { TestBed } from '@angular/core/testing';

import { ArtistforumService } from './artistforum.service';

describe('ArtistforumService', () => {
  let service: ArtistforumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistforumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
