import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAuthPasswordModalComponent } from './update-auth-password-modal.component';

describe('UpdateAuthPasswordModalComponent', () => {
  let component: UpdateAuthPasswordModalComponent;
  let fixture: ComponentFixture<UpdateAuthPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAuthPasswordModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAuthPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
