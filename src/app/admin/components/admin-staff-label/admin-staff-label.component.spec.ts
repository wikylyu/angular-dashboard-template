import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffLabelComponent } from './admin-staff-label.component';

describe('AdminStaffLabelComponent', () => {
  let component: AdminStaffLabelComponent;
  let fixture: ComponentFixture<AdminStaffLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStaffLabelComponent]
    });
    fixture = TestBed.createComponent(AdminStaffLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
