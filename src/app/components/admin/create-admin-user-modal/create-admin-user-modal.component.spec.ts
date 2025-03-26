import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminUserModalComponent } from './create-admin-user-modal.component';

describe('CreateAdminUserModalComponent', () => {
  let component: CreateAdminUserModalComponent;
  let fixture: ComponentFixture<CreateAdminUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAdminUserModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdminUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
