import { TestBed } from '@angular/core/testing';

import { AdministradorTRMService } from './administrador-trm.service';

describe('CrearNotaContableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
      const service: AdministradorTRMService = TestBed.get(AdministradorTRMService);
    expect(service).toBeTruthy();
  });
});
