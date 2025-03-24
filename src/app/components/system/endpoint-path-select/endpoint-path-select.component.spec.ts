import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointPathSelectComponent } from './endpoint-path-select.component';

describe('EndpointPathSelectComponent', () => {
  let component: EndpointPathSelectComponent;
  let fixture: ComponentFixture<EndpointPathSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndpointPathSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndpointPathSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
