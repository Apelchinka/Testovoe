import { Injectable } from '@angular/core';
import {
  distinctUntilChanged,
  EMPTY,
  map,
  Observable,
  of,
  share,
  switchMap,
  throwError,
  withLatestFrom,
} from 'rxjs';
import { IListResponse } from '../models/list-response.model';
import { IUser } from '../models/user.model';
import { UsersService } from './users.service';
import { ResourcesService } from './resources.service';
import { IResource } from '../models/resource.model';
import { Router } from '@angular/router';

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
    const targetPage$ = routerParams$.pipe(
      map((routerParams) => {
        return Number(
          listType === 'users'
            ? routerParams['usersPage']
            : routerParams['resourcesPage']
        );
      }),
      distinctUntilChanged()
    );
    const concomitantPage$ = routerParams$.pipe(
      map((routerParams) => {
        return Number(
          listType === 'users'
            ? routerParams['resourcesPage']
            : routerParams['usersPage']
        );
      }),
      distinctUntilChanged()
    );
    return targetPage$.pipe(
      switchMap((pageNumbers) => {
        const listRequest$: Observable<IListResponse<IUser | IResource>> =
          listType === 'users'
            ? this._usersService.getUsersApi(pageNumbers)
            : this._resourcesService.getResources(pageNumbers);
        return listRequest$.pipe(withLatestFrom(concomitantPage$));
      }),
      switchMap(([response, concomitantPage]) => {
        if (response.data.length) {
          return of(response);
        } else {
          if (response.page > 1) {
            const redirectRoute =
              listType === 'users'
                ? `users-and-resources/${response.total_pages}/${concomitantPage}`
                : `users-and-resources/${concomitantPage}/${response.total_pages}`;
            this._router.navigate([redirectRoute]);
            return EMPTY;
          } else {
            return throwError(() => 'Users not found');
          }
        }
      }),
      share()
    );
  }
}
