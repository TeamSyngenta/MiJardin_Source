import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarNotaContableComponent } from './modificar-nota-contable.component';

describe('ModificarNotaContableComponent', () => {
    let component: ModificarNotaContableComponent;
    let fixture: ComponentFixture<ModificarNotaContableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ModificarNotaContableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(ModificarNotaContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
