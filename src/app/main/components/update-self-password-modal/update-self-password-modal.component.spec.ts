import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSelfPasswordModalComponent } from './update-self-password-modal.component';

describe('UpdateSelfPasswordModalComponent', () => {
  let component: UpdateSelfPasswordModalComponent;
  let fixture: ComponentFixture<UpdateSelfPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSelfPasswordModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSelfPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
