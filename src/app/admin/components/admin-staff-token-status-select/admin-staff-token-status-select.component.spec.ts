import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffTokenStatusSelectComponent } from './admin-staff-token-status-select.component';

describe('AdminStaffTokenStatusSelectComponent', () => {
  let component: AdminStaffTokenStatusSelectComponent;
  let fixture: ComponentFixture<AdminStaffTokenStatusSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStaffTokenStatusSelectComponent]
    });
    fixture = TestBed.createComponent(AdminStaffTokenStatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
