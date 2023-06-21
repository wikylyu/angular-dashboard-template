import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuperuserPageComponent } from './create-superuser-page.component';

describe('CreateSuperuserPageComponent', () => {
  let component: CreateSuperuserPageComponent;
  let fixture: ComponentFixture<CreateSuperuserPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSuperuserPageComponent]
    });
    fixture = TestBed.createComponent(CreateSuperuserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
