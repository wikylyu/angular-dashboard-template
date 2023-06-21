import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSelfProfileModalComponent } from './update-self-profile-modal.component';

describe('UpdateSelfProfileModalComponent', () => {
  let component: UpdateSelfProfileModalComponent;
  let fixture: ComponentFixture<UpdateSelfProfileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSelfProfileModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSelfProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
