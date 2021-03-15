import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordStrengthBarComponent } from './resetpassword-strength-bar.component';

describe('resetPasswordStrengthBarComponent', () => {
  let component: ResetPasswordStrengthBarComponent;
  let fixture: ComponentFixture<ResetPasswordStrengthBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordStrengthBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordStrengthBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
