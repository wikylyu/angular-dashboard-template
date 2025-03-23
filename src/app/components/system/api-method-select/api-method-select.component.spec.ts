import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMethodSelectComponent } from './api-method-select.component';

describe('ApiMethodSelectComponent', () => {
  let component: ApiMethodSelectComponent;
  let fixture: ComponentFixture<ApiMethodSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiMethodSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiMethodSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
