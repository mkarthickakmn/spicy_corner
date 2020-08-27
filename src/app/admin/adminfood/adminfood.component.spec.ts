import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminfoodComponent } from './adminfood.component';

describe('AdminfoodComponent', () => {
  let component: AdminfoodComponent;
  let fixture: ComponentFixture<AdminfoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminfoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
