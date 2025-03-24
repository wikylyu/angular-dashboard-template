import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePermissionModalComponent } from './update-permission-modal.component';

describe('UpdatePermissionModalComponent', () => {
  let component: UpdatePermissionModalComponent;
  let fixture: ComponentFixture<UpdatePermissionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePermissionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePermissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
