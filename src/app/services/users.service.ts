import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { IListResponse } from '../models/list-response.model';

@Injectable()
export class UsersService {
  constructor(private _http: HttpClient) {}

  public getUsersApi(page = 1): Observable<IListResponse<IUser>> {
    const params = new HttpParams().set('page', page);
    return this._http.get<IListResponse<IUser>>('https://reqres.in/api/users', {
      params,
    });
  }
  public getUserApi(userId: string): Observable<Record<'data', IUser>> {
    return this._http.get<Record<'data', IUser>>(
      `https://reqres.in/api/users/${userId}`
    );
  }
  public removeUserApi(userId: string): Observable<void> {
    return this._http.delete<void>(`https://reqres.in/api/users/${userId}`);
  }
}
