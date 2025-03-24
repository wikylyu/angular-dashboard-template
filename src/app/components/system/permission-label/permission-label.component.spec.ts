import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionLabelComponent } from './permission-label.component';

describe('PermissionLabelComponent', () => {
  let component: PermissionLabelComponent;
  let fixture: ComponentFixture<PermissionLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
