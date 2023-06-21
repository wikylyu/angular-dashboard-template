import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCheckerComponent } from './image-checker.component';

describe('ImageCheckerComponent', () => {
  let component: ImageCheckerComponent;
  let fixture: ComponentFixture<ImageCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageCheckerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
