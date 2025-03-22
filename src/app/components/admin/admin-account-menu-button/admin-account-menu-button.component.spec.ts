import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountMenuButtonComponent } from './admin-account-menu-button.component';

describe('AdminAccountMenuButtonComponent', () => {
  let component: AdminAccountMenuButtonComponent;
  let fixture: ComponentFixture<AdminAccountMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAccountMenuButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAccountMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
