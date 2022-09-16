import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../../services/authorization.service';
import { ActivatedRoute, Router } from '@angular/router';
import { repeatPasswordValidator } from '../../../../utils/validators/repeat-password.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  public get email(): AbstractControl<string | null> | null {
    return this.userAuthData.get('email');
  }
  public get password(): AbstractControl<string | null> | null {
    return this.userAuthData.get('password');
  }
  public get passwordRepeat(): AbstractControl<string | null> | null {
    return this.userAuthData.get('password_repeat');
  }
  public userAuthData = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password_repeat: ['', [Validators.required, repeatPasswordValidator]],
  });
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthorizationService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}
  public signUp(): void {
    const { email, password } = this.userAuthData.value;
    if (this.userAuthData.valid && email && password) {
      this._authService.registration(email, password).subscribe(() =>
        this._router.navigate(['../sign-in'], {
          relativeTo: this._activatedRoute,
        })
      );
    }
  }
}
