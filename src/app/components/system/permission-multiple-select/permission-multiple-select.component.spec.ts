import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionMultipleSelectComponent } from './permission-multiple-select.component';

describe('PermissionMultipleSelectComponent', () => {
  let component: PermissionMultipleSelectComponent;
  let fixture: ComponentFixture<PermissionMultipleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionMultipleSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionMultipleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
