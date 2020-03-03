import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionFlujoAprobacionComponent } from './administracion-flujo-aprobacion.component';

describe('AdministracionFlujoAprobacionComponent', () => {
    let component: AdministracionFlujoAprobacionComponent;
    let fixture: ComponentFixture<AdministracionFlujoAprobacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [AdministracionFlujoAprobacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(AdministracionFlujoAprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
