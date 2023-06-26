import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatusSelectComponent } from './user-status-select.component';

describe('UserStatusSelectComponent', () => {
  let component: UserStatusSelectComponent;
  let fixture: ComponentFixture<UserStatusSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserStatusSelectComponent]
    });
    fixture = TestBed.createComponent(UserStatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
