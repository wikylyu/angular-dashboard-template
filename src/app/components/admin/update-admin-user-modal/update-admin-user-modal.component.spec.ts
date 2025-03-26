import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminUserModalComponent } from './update-admin-user-modal.component';

describe('UpdateAdminUserModalComponent', () => {
  let component: UpdateAdminUserModalComponent;
  let fixture: ComponentFixture<UpdateAdminUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAdminUserModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAdminUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
