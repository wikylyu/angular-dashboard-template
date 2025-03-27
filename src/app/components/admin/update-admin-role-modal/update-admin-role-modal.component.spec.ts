import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminRoleModalComponent } from './update-admin-role-modal.component';

describe('UpdateAdminRoleModalComponent', () => {
  let component: UpdateAdminRoleModalComponent;
  let fixture: ComponentFixture<UpdateAdminRoleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAdminRoleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAdminRoleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
