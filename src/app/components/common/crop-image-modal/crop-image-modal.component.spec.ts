import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropImageModalComponent } from './crop-image-modal.component';

describe('CropImageModalComponent', () => {
  let component: CropImageModalComponent;
  let fixture: ComponentFixture<CropImageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropImageModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CropImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
