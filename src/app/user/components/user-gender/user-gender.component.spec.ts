import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGenderComponent } from './user-gender.component';

describe('UserGenderComponent', () => {
  let component: UserGenderComponent;
  let fixture: ComponentFixture<UserGenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserGenderComponent]
    });
    fixture = TestBed.createComponent(UserGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
