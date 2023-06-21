import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffSelectComponent } from './admin-staff-select.component';

describe('AdminStaffSelectComponent', () => {
  let component: AdminStaffSelectComponent;
  let fixture: ComponentFixture<AdminStaffSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStaffSelectComponent]
    });
    fixture = TestBed.createComponent(AdminStaffSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
