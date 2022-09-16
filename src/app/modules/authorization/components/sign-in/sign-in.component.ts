import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../../services/authorization.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  public get email(): AbstractControl<string | null> | null {
    return this.userAuthData.get('email');
  }
  public get password(): AbstractControl<string | null> | null {
    return this.userAuthData.get('password');
  }

  public userAuthData = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  public errorMessage: string | null = null;
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthorizationService,
    private _router: Router
  ) {}

  public signIn(): void {
    const { email, password } = this.userAuthData.value;
    if (this.userAuthData.valid && email && password) {
      this._authService.login(email, password).subscribe(
        () => this._router.navigate(['']),
        (error: HttpErrorResponse) => {
          this.errorMessage =
            error.error?.error ??
            'Something went wrong, please try again later';
        }
      );
    }
  }
}
