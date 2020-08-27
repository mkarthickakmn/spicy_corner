import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodquantityComponent } from './foodquantity.component';

describe('FoodquantityComponent', () => {
  let component: FoodquantityComponent;
  let fixture: ComponentFixture<FoodquantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodquantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodquantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
