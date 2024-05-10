import { TestBed } from '@angular/core/testing';

import { SeConnecterService } from './se-connecter.service';

describe('SeConnecterService', () => {
  let service: SeConnecterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeConnecterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
