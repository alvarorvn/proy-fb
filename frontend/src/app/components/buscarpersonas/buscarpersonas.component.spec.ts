import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarpersonasComponent } from './buscarpersonas.component';

describe('BuscarpersonasComponent', () => {
  let component: BuscarpersonasComponent;
  let fixture: ComponentFixture<BuscarpersonasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarpersonasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarpersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
