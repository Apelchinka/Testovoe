import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { IListResponse } from '../models/list-response.model';
import { ApiToken } from '../tokens/api.token';

@Injectable()
export class UsersService {
  private usersApi = `${this._api}users`;
  constructor(
    private _http: HttpClient,
    @Inject(ApiToken) private _api: string
  ) {}

  public getUsersApi(page = 1): Observable<IListResponse<IUser>> {
    const headers = { 'Cache-Control': 'no-cache' };
    const params = new HttpParams().set('page', page);
    return this._http.get<IListResponse<IUser>>(this.usersApi, {
      params,
      headers,
    });
  }
  public getUserApi(userId: string): Observable<Record<'data', IUser>> {
    const headers = { 'Cache-Control': 'no-cache' };
    return this._http.get<Record<'data', IUser>>(`${this.usersApi}/${userId}`, {
      headers,
    });
  }
  public removeUserApi(userId: string): Observable<void> {
    return this._http.delete<void>(`${this.usersApi}/${userId}`);
  }
  public updateUserApi(user: IUser): Observable<void> {
    return this._http.put<void>(`${this.usersApi}/${user.id}`, user);
  }
}
