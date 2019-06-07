import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupModelComponent } from './login-signup-model.component';

describe('LoginSignupModelComponent', () => {
  let component: LoginSignupModelComponent;
  let fixture: ComponentFixture<LoginSignupModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSignupModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSignupModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
