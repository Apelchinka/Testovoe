import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from '../../models/user.model';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { isIUser } from '../../utils/is-i-user';
import { AbstractDestroyableComponent } from '../../models/abstracts/abstract-destroyable.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent extends AbstractDestroyableComponent {
  public readonly editing = new Subject<boolean>();
  public readonly userDataFormGroup = this.createUserDataFormGroup();
  public userData: IUser;

  public get avatar(): AbstractControl<string | null> | null {
    return this.userDataFormGroup.get('avatar');
  }
  public get lastName(): AbstractControl<string | null> | null {
    return this.userDataFormGroup.get('last_name');
  }
  public get firstName(): AbstractControl<string | null> | null {
    return this.userDataFormGroup.get('first_name');
  }
  public get email(): AbstractControl<string | null> | null {
    return this.userDataFormGroup.get('email');
  }

  constructor(
    private _cdr: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _usersService: UsersService
  ) {
    super();
    this.userData = this._activatedRoute.snapshot.data['userData'];
  }

  public editingChange(editing: boolean): void {
    if (editing && this.userData) {
      this.userDataFormGroup.patchValue(this.userData);
      this.userDataFormGroup.markAsPristine();
    }
    this.editing.next(editing);
  }

  public updateUser(): void {
    const { value } = this.userDataFormGroup;
    if (
      this.userDataFormGroup.valid &&
      this.userDataFormGroup.dirty &&
      isIUser(value)
    ) {
      this._usersService
        .updateUserApi(value)
        .pipe(takeUntil(this.destroyNotifier))
        .subscribe(() => {
          this.userData = value;
          this.editingChange(false);
        });
    }
  }

  private createUserDataFormGroup() {
    return this._formBuilder.group({
      id: [-1, [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      avatar: [''],
    });
  }
}
