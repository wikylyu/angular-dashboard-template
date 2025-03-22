import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOverviewPageComponent } from './dashboard-overview-page.component';

describe('DashboardOverviewPageComponent', () => {
  let component: DashboardOverviewPageComponent;
  let fixture: ComponentFixture<DashboardOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardOverviewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
