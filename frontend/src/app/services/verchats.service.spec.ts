import { TestBed } from '@angular/core/testing';

import { VerchatsService } from './verchats.service';

describe('VerchatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerchatsService = TestBed.get(VerchatsService);
    expect(service).toBeTruthy();
  });
});
