import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorAprobadoresComponent } from './administrador-aprobadores.component';

describe('AdministradorAprobadoresComponent', () => {
  let component: AdministradorAprobadoresComponent;
  let fixture: ComponentFixture<AdministradorAprobadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorAprobadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorAprobadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
