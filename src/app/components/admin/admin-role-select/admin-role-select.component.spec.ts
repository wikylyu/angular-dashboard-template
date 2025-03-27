import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoleSelectComponent } from './admin-role-select.component';

describe('AdminRoleSelectComponent', () => {
  let component: AdminRoleSelectComponent;
  let fixture: ComponentFixture<AdminRoleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRoleSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRoleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
