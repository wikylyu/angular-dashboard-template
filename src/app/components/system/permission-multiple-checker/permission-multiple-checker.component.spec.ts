import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionMultipleCheckerComponent } from './permission-multiple-checker.component';

describe('PermissionMultipleCheckerComponent', () => {
  let component: PermissionMultipleCheckerComponent;
  let fixture: ComponentFixture<PermissionMultipleCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionMultipleCheckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionMultipleCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
