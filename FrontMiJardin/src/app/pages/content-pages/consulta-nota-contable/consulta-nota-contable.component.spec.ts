import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaNotaContableComponent } from './consulta-nota-contable.component';

describe('ConsultaNotaContableComponent', () => {
  let component: ConsultaNotaContableComponent;
  let fixture: ComponentFixture<ConsultaNotaContableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaNotaContableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaNotaContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
