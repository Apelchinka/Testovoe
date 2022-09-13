import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../models/user.model';
import { PageEvent } from '@angular/material/paginator';
import { IListResponse } from '../../models/list-response.model';
import { ListService } from '../../services/list.service';
import { IResource } from '../../models/resource.model';

@Component({
  selector: 'app-users-and-resources',
  templateUrl: './users-and-resources.component.html',
  styleUrls: ['./users-and-resources.component.scss'],
})
export class UsersAndResourcesComponent {
  public users$: Observable<IListResponse<IUser>>;
  public resources$: Observable<IListResponse<IResource>>;
  private get currentUsersPage(): number {
    return this._activatedRoute.snapshot.params['usersPage'];
  }
  private get currentResourcePage(): number {
    return this._activatedRoute.snapshot.params['resourcesPage'];
  }
  private _updateList = new BehaviorSubject<void>(undefined);
  constructor(
    private _listService: ListService,
    private _userService: UsersService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.users$ = this._listService.getList(
      'users',
      this._activatedRoute.params
    );
    this.resources$ = this._listService.getList(
      'resources',
      this._activatedRoute.params
    );
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

  public removeUser(userId: number) {
    this._userService
      .removeUserApi(userId.toString())
      .pipe(take(1))
      .subscribe(() => {
        this._updateList.next();
      });
  }
}
