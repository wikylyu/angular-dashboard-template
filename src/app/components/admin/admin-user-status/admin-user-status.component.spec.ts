import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserStatusComponent } from './admin-user-status.component';

describe('AdminUserStatusComponent', () => {
  let component: AdminUserStatusComponent;
  let fixture: ComponentFixture<AdminUserStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
