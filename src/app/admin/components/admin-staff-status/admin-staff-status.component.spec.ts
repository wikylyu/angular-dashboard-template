import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffStatusComponent } from './admin-staff-status.component';

describe('AdminStaffStatusComponent', () => {
  let component: AdminStaffStatusComponent;
  let fixture: ComponentFixture<AdminStaffStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStaffStatusComponent]
    });
    fixture = TestBed.createComponent(AdminStaffStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
