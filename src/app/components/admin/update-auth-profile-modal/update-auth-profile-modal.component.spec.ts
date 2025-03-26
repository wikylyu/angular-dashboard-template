import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAuthProfileModalComponent } from './update-auth-profile-modal.component';

describe('UpdateAuthProfileModalComponent', () => {
  let component: UpdateAuthProfileModalComponent;
  let fixture: ComponentFixture<UpdateAuthProfileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAuthProfileModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAuthProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
