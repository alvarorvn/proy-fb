import { TestBed } from '@angular/core/testing';

import { BuscarpersonasService } from './buscarpersonas.service';

describe('BuscarpersonasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuscarpersonasService = TestBed.get(BuscarpersonasService);
    expect(service).toBeTruthy();
  });
});
