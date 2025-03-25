import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpMethodComponent } from './http-method.component';

describe('HttpMethodComponent', () => {
  let component: HttpMethodComponent;
  let fixture: ComponentFixture<HttpMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
