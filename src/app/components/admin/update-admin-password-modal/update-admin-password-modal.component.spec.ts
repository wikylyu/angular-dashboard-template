import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminPasswordModalComponent } from './update-admin-password-modal.component';

describe('UpdateAdminPasswordModalComponent', () => {
  let component: UpdateAdminPasswordModalComponent;
  let fixture: ComponentFixture<UpdateAdminPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAdminPasswordModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAdminPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
