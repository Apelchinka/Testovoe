import { Injectable } from '@angular/core';
import { Observable, share, switchMap, withLatestFrom } from 'rxjs';
import { IListResponse } from '../models/list-response.model';
import { IUser } from '../models/user.model';
import { UsersService } from './users.service';
import { ResourcesService } from './resources.service';
import { IResource } from '../models/resource.model';
import { Router } from '@angular/router';
import { getPageNumber } from '../utils/get-page-number';
import { checkList } from '../utils/check-list';

@Injectable()
export class ListService {
  constructor(
    private _router: Router,
    private _usersService: UsersService,
    private _resourcesService: ResourcesService
  ) {}

  public getList(
    listType: 'users',
    routerParams$: Observable<Record<string, string>>
  ): Observable<IListResponse<IUser>>;
  public getList(
    listType: 'resources',
    routerParams$: Observable<Record<string, string>>
  ): Observable<IListResponse<IResource>>;
  public getList(
    listType: 'users' | 'resources',
    routerParams$: Observable<Record<string, string>>
  ): Observable<IListResponse<IUser | IResource>> {
    const targetPage$ = getPageNumber(
      routerParams$,
      listType === 'users' ? 'usersPage' : 'resourcesPage'
    );
    const concomitantPage$ = getPageNumber(
      routerParams$,
      listType === 'users' ? 'resourcesPage' : 'usersPage'
    );

    return targetPage$.pipe(
      switchMap((pageNumbers) => {
        const listRequest$: Observable<IListResponse<IUser | IResource>> =
          listType === 'users'
            ? this._usersService.getUsersApi(pageNumbers)
            : this._resourcesService.getResources(pageNumbers);
        return listRequest$.pipe(withLatestFrom(concomitantPage$));
      }),
      switchMap((result) => checkList(result, listType, this._router)),
      share()
    );
  }
}
