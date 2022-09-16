import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable({ providedIn: 'root' })
export class UserTitleResolver implements Resolve<string> {
  constructor(private _usersService: UsersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> {
    return this._usersService
      .getSharedUserData(route.params['id'])
      .pipe(map(({ first_name, last_name }) => `${first_name} ${last_name}`));
  }
}
