import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionUsuarioComponent } from './administracion-usuario.component';

describe('AdministracionUsuarioComponent', () => {
  let component: AdministracionUsuarioComponent;
  let fixture: ComponentFixture<AdministracionUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
