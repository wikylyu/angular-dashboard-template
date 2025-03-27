import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAccountMenuButtonComponent } from './auth-account-menu-button.component';

describe('AuthAccountMenuButtonComponent', () => {
  let component: AuthAccountMenuButtonComponent;
  let fixture: ComponentFixture<AuthAccountMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthAccountMenuButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthAccountMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
