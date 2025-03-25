import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApiModalComponent } from './update-api-modal.component';

describe('UpdateApiModalComponent', () => {
  let component: UpdateApiModalComponent;
  let fixture: ComponentFixture<UpdateApiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateApiModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateApiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
