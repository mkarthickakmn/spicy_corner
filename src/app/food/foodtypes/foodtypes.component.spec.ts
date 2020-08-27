import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodtypesComponent } from './foodtypes.component';

describe('FoodtypesComponent', () => {
  let component: FoodtypesComponent;
  let fixture: ComponentFixture<FoodtypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodtypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
