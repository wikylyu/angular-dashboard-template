import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserLabelComponent } from './admin-user-label.component';

describe('AdminUserLabelComponent', () => {
  let component: AdminUserLabelComponent;
  let fixture: ComponentFixture<AdminUserLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
