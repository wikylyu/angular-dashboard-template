import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffTokenListPageComponent } from './admin-staff-token-list-page.component';

describe('AdminStaffTokenListPageComponent', () => {
  let component: AdminStaffTokenListPageComponent;
  let fixture: ComponentFixture<AdminStaffTokenListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStaffTokenListPageComponent]
    });
    fixture = TestBed.createComponent(AdminStaffTokenListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
