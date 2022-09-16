import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISignInResponseModel } from '../models/sign-in-response.model';
import { ApiToken } from '../tokens/api.token';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  public readonly userProfile$: Observable<string | null>;
  private _userIsAuthorized = new BehaviorSubject<string | null>(null);
  constructor(
    private _http: HttpClient,
    @Inject(ApiToken) private _api: string
  ) {
    this.userProfile$ = this._userIsAuthorized.asObservable();
  }
  public registration(
    email: string,
    password: string
  ): Observable<ISignInResponseModel> {
    return this._http.post<ISignInResponseModel>(`${this._api}register`, {
      email,
      password,
    });
  }
  public login(email: string, password: string): Observable<string | null> {
    return this._http
      .post<void>(`${this._api}login`, {
        email,
        password,
      })
      .pipe(
        tap(() => {
          // я бы через switchMap сделала запрос на проверку авторизации,
          // но т.к. этого запроса нет, просто записываю в localStorage login пользователя
          localStorage.setItem('userName', email);
        }),
        switchMap(() => this.checkAuth())
      );
  }
  public logout() {
    localStorage.removeItem('userName');
    this._userIsAuthorized.next(null);
  }
  public checkAuth(): Observable<string | null> {
    // десь следовало сделать запрос для проверки авторизации, но т.к. ее нет я беру данные из localstorage
    return of(localStorage.getItem('userName')).pipe(
      tap((value) => this._userIsAuthorized.next(value))
    );
  }
}
