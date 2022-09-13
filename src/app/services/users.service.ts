import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IUser } from '../models/user';
import { IUsersResponse } from '../models/users-response';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  public getUsers(page = 1): Observable<IUsersResponse> {
    const params = new HttpParams().set('page', page);
    return this._http.get<IUsersResponse>('https://reqres.in/api/users', {
      params,
    });
  }
  public getUser(userId: string): Observable<Record<'data', IUser>> {
    return this._http.get<Record<'data', IUser>>(
      `https://reqres.in/api/users/${userId}`
    );
  }
}
