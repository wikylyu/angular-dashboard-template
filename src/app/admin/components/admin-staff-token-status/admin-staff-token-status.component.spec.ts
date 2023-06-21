import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffTokenStatusComponent } from './admin-staff-token-status.component';

describe('AdminStaffTokenStatusComponent', () => {
  let component: AdminStaffTokenStatusComponent;
  let fixture: ComponentFixture<AdminStaffTokenStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStaffTokenStatusComponent]
    });
    fixture = TestBed.createComponent(AdminStaffTokenStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
