import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiListPageComponent } from './api-list-page.component';

describe('ApiListPageComponent', () => {
  let component: ApiListPageComponent;
  let fixture: ComponentFixture<ApiListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
