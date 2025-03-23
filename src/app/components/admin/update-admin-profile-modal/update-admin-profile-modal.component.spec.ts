import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminProfileModalComponent } from './update-admin-profile-modal.component';

describe('UpdateAdminProfileModalComponent', () => {
  let component: UpdateAdminProfileModalComponent;
  let fixture: ComponentFixture<UpdateAdminProfileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAdminProfileModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAdminProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
