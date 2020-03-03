import { TestBed } from '@angular/core/testing';

import { AdministracionFlujoAprobacionService } from './administracion-flujo-aprobacion.service';

describe('AdministracionFlujoAprobacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
      const service: AdministracionFlujoAprobacionService = TestBed.get(AdministracionFlujoAprobacionService);
    expect(service).toBeTruthy();
  });
});
