import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerGuardadosComponent } from './ver-guardados.component';

describe('VerGuardadosComponent', () => {
  let component: VerGuardadosComponent;
  let fixture: ComponentFixture<VerGuardadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerGuardadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerGuardadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
