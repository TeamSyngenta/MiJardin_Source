import { TestBed } from '@angular/core/testing';

import { ModificarNotaContableService } from './modificar-nota-contable.service';

describe('ModificarNotaContableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModificarNotaContableService = TestBed.get(ModificarNotaContableService);
    expect(service).toBeTruthy();
  });
});
