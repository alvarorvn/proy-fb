import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerconectadosComponent } from './verconectados.component';

describe('VerconectadosComponent', () => {
  let component: VerconectadosComponent;
  let fixture: ComponentFixture<VerconectadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerconectadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerconectadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
