import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminStaffModalComponent } from './update-admin-staff-modal.component';

describe('UpdateAdminStaffModalComponent', () => {
  let component: UpdateAdminStaffModalComponent;
  let fixture: ComponentFixture<UpdateAdminStaffModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAdminStaffModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAdminStaffModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
