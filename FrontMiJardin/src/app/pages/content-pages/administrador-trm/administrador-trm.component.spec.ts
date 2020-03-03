import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorTRMComponent } from './administrador-trm.component';

describe('AdministradorTRMComponent', () => {
  let component: AdministradorTRMComponent;
  let fixture: ComponentFixture<AdministradorTRMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorTRMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorTRMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
