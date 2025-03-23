import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMethodComponent } from './api-method.component';

describe('ApiMethodComponent', () => {
  let component: ApiMethodComponent;
  let fixture: ComponentFixture<ApiMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
