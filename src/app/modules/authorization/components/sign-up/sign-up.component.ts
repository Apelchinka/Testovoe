import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../../services/authorization.service';
import { ActivatedRoute, Router } from '@angular/router';
import { repeatPasswordValidator } from '../../../../utils/validators/repeat-password.validator';
import { takeUntil } from 'rxjs';
import { AbstractDestroyableComponent } from '../../../../models/abstracts/abstract-destroyable.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent extends AbstractDestroyableComponent {
  public readonly userAuthData = this.createUserAuthData();

  public get email(): AbstractControl<string | null> | null {
    return this.userAuthData.get('email');
  }
  public get password(): AbstractControl<string | null> | null {
    return this.userAuthData.get('password');
  }
  public get passwordRepeat(): AbstractControl<string | null> | null {
    return this.userAuthData.get('password_repeat');
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthorizationService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    super();
  }

  public signUp(): void {
    const { email, password } = this.userAuthData.value;
    if (this.userAuthData.valid && email && password) {
      this._authService
        .registration(email, password)
        .pipe(takeUntil(this.destroyNotifier))
        .subscribe(() =>
          this._router.navigate(['../sign-in'], {
            relativeTo: this._activatedRoute,
          })
        );
    }
  }

  private createUserAuthData() {
    return this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_repeat: ['', [Validators.required, repeatPasswordValidator]],
    });
  }
}
