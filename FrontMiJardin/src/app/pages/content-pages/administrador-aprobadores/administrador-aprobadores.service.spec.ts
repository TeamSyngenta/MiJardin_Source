import { TestBed } from '@angular/core/testing';

import { ServicioAdminAprobadoresService } from './administrador-aprobadores.service';

describe('ServicioAdminAprobadoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
      const service: ServicioAdminAprobadoresService = TestBed.get(ServicioAdminAprobadoresService);
    expect(service).toBeTruthy();
  });
});
