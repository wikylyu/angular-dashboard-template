import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminStaffPasswordModalComponent } from './update-admin-staff-password-modal.component';

describe('UpdateAdminStaffPasswordModalComponent', () => {
  let component: UpdateAdminStaffPasswordModalComponent;
  let fixture: ComponentFixture<UpdateAdminStaffPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAdminStaffPasswordModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAdminStaffPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
