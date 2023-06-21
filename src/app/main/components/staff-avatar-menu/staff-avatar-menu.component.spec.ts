import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAvatarMenuComponent } from './staff-avatar-menu.component';

describe('StaffAvatarMenuComponent', () => {
  let component: StaffAvatarMenuComponent;
  let fixture: ComponentFixture<StaffAvatarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffAvatarMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffAvatarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
