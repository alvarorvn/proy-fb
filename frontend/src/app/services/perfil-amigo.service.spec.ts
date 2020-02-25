import { TestBed } from '@angular/core/testing';

import { PerfilAmigoService } from './perfil-amigo.service';

describe('PerfilAmigoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerfilAmigoService = TestBed.get(PerfilAmigoService);
    expect(service).toBeTruthy();
  });
});
