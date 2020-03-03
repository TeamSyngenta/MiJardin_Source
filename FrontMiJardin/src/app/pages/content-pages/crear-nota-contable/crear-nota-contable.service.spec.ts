import { TestBed } from '@angular/core/testing';

import { CrearNotaContableService } from './crear-nota-contable.service';

describe('CrearNotaContableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrearNotaContableService = TestBed.get(CrearNotaContableService);
    expect(service).toBeTruthy();
  });
});
