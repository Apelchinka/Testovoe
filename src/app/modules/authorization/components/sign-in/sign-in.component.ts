import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../../services/authorization.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  public readonly userAuthData = this.createUserAuthData();
  public errorMessage: string | null = null;

  public get email(): AbstractControl<string | null> | null {
    return this.userAuthData.get('email');
  }
  public get password(): AbstractControl<string | null> | null {
    return this.userAuthData.get('password');
  }

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

  private createUserAuthData() {
    return this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
