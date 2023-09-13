/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FanaticforumService } from './fanaticforum.service';

describe('Service: Fanaticforum', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FanaticforumService]
    });
  });

  it('should ...', inject([FanaticforumService], (service: FanaticforumService) => {
    expect(service).toBeTruthy();
  }));
});
