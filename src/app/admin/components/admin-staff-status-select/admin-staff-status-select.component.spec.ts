import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffStatusSelectComponent } from './admin-staff-status-select.component';

describe('AdminStaffStatusSelectComponent', () => {
  let component: AdminStaffStatusSelectComponent;
  let fixture: ComponentFixture<AdminStaffStatusSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStaffStatusSelectComponent]
    });
    fixture = TestBed.createComponent(AdminStaffStatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
