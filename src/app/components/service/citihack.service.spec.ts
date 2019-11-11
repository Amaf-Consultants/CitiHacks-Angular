import { TestBed } from '@angular/core/testing';

import { CitihackService } from './citihack.service';

describe('CitihackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CitihackService = TestBed.get(CitihackService);
    expect(service).toBeTruthy();
  });
});
