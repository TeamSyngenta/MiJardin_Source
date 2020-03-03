import { TestBed } from '@angular/core/testing';

import { ConsultarNotaContableService } from './consulta-nota-contable.service';

describe('CrearNotaContableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
      const service: ConsultarNotaContableService = TestBed.get(ConsultarNotaContableService);
    expect(service).toBeTruthy();
  });
});
