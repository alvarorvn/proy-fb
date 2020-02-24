import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerchatsComponent } from './verchats.component';

describe('VerchatsComponent', () => {
  let component: VerchatsComponent;
  let fixture: ComponentFixture<VerchatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerchatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerchatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
