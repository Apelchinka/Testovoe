import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { BehaviorSubject, filter, Observable, switchMap, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../models/user.model';
import { PageEvent } from '@angular/material/paginator';
import { IListResponse } from '../../models/list-response.model';
import { ListService } from '../../services/list.service';
import { IResource } from '../../models/resource.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-users-and-resources',
  templateUrl: './users-and-resources.component.html',
  styleUrls: ['./users-and-resources.component.scss'],
})
export class UsersAndResourcesComponent {
  public readonly users$: Observable<IListResponse<IUser>>;
  public readonly resources$: Observable<IListResponse<IResource>>;

  private get currentUsersPage(): number {
    return this._activatedRoute.snapshot.params['usersPage'];
  }
  private get currentResourcePage(): number {
    return this._activatedRoute.snapshot.params['resourcesPage'];
  }

  private readonly _updateUsersList = new BehaviorSubject<void>(undefined);

  constructor(
    private _listService: ListService,
    private _userService: UsersService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _dialog: MatDialog
  ) {
    this.users$ = this.getUsers();
    this.resources$ = this.getResources();
  }

  public openDialog(): MatDialogRef<ModalComponent, boolean | undefined> {
    return this._dialog.open<ModalComponent, boolean>(ModalComponent, {
      width: '250px',
    });
  }

  public goToUser(id: number): void {
    this._router.navigate([`user/${id}`]);
  }

  public changeUsersPage(page: PageEvent): void {
    this._router.navigate([
      `users-and-resources/${page.pageIndex + 1}/${this.currentResourcePage}`,
    ]);
  }
  public changeResourcesPage(page: PageEvent): void {
    this._router.navigate([
      `users-and-resources/${this.currentUsersPage}/${page.pageIndex + 1}`,
    ]);
  }

  public removeUser(userId: number): void {
    this.openDialog()
      .afterClosed()
      .pipe(
        take(1),
        filter((value) => value === true),
        switchMap(() => this._userService.removeUserApi(String(userId)))
      )
      .subscribe(() => this._updateUsersList.next());
  }

  private getUsers() {
    return this._updateUsersList.pipe(
      switchMap(() =>
        this._listService.getList('users', this._activatedRoute.params)
      )
    );
  }

  private getResources() {
    return this._listService.getList('resources', this._activatedRoute.params);
  }
}
