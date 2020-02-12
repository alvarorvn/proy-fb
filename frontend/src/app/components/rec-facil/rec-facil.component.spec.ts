import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecFacilComponent } from './rec-facil.component';

describe('RecFacilComponent', () => {
  let component: RecFacilComponent;
  let fixture: ComponentFixture<RecFacilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecFacilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecFacilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
