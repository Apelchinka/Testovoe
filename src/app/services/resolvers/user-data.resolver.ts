import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { IUser } from '../../models/user.model';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable({ providedIn: 'root' })
export class UserDataResolver implements Resolve<IUser> {
  constructor(private _usersService: UsersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IUser> | Promise<IUser> | IUser {
    return this._usersService.getSharedUserData(route.params['id']);
  }
}
