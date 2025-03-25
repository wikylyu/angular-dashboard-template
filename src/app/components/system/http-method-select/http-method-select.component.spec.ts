import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpMethodSelectComponent } from './http-method-select.component';

describe('HttpMethodSelectComponent', () => {
  let component: HttpMethodSelectComponent;
  let fixture: ComponentFixture<HttpMethodSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpMethodSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpMethodSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
