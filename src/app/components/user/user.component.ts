import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { map, Observable, Subject } from 'rxjs';
import { IUser } from '../../models/user.model';
import {
  AbstractControl,
  FormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { isIUser } from '../../utils/is-i-user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  public editing = new Subject<boolean>();
  public userData: IUser | undefined;
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

  public userDataFormGroup = this._formBuilder.group({
    id: [-1, [Validators.required, Validators.min(0)]],
    email: ['', [Validators.required, Validators.email]],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    avatar: [''],
  });
  constructor(
    private _cdr: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _usersService: UsersService
  ) {}
  ngOnInit() {
    this._usersService
      .getUserApi(this._activatedRoute.snapshot.params['id'])
      .subscribe(({ data }) => {
        this.userData = data;
        this._cdr.markForCheck();
      });
  }
  public editingChange(editing: boolean): void {
    if (editing && this.userData) {
      this.userDataFormGroup.patchValue(this.userData);
    }
    this.editing.next(editing);
  }

  public updateUser(): void {
    const { value } = this.userDataFormGroup;
    if (isIUser(value) && this.userDataFormGroup.valid) {
      this._usersService.updateUserApi(value).subscribe(() => {
        this.userData = value;
        this.editingChange(false);
      });
    }
  }
}
