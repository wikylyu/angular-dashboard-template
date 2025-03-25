import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserStatusSelectComponent } from './admin-user-status-select.component';

describe('AdminUserStatusSelectComponent', () => {
  let component: AdminUserStatusSelectComponent;
  let fixture: ComponentFixture<AdminUserStatusSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserStatusSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserStatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
