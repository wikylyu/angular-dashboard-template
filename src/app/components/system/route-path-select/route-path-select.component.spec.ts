import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePathSelectComponent } from './route-path-select.component';

describe('RoutePathSelectComponent', () => {
  let component: RoutePathSelectComponent;
  let fixture: ComponentFixture<RoutePathSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutePathSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutePathSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
