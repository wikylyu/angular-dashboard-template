import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoleListPageComponent } from './admin-role-list-page.component';

describe('AdminRoleListPageComponent', () => {
  let component: AdminRoleListPageComponent;
  let fixture: ComponentFixture<AdminRoleListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRoleListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRoleListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
