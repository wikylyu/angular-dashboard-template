import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageActionbarComponent } from './page-actionbar.component';

describe('PageActionbarComponent', () => {
  let component: PageActionbarComponent;
  let fixture: ComponentFixture<PageActionbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageActionbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageActionbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
