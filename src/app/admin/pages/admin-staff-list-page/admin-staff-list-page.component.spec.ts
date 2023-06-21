import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffListPageComponent } from './admin-staff-list-page.component';

describe('AdminStaffListPageComponent', () => {
  let component: AdminStaffListPageComponent;
  let fixture: ComponentFixture<AdminStaffListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStaffListPageComponent]
    });
    fixture = TestBed.createComponent(AdminStaffListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
