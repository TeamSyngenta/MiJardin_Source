import {TestBed} from '@angular/core/testing';

import { SyngentaSeguridadService } from './syntenta-seguridad.service';

describe('SyngentaSeguridadService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: SyngentaSeguridadService = TestBed.get(SyngentaSeguridadService);
        expect(service).toBeTruthy();
    });
});
