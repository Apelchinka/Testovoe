import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListResponse } from '../models/list-response.model';
import { IResource } from '../models/resource.model';
import { ApiToken } from '../tokens/api.token';

@Injectable()
export class ResourcesService {
  constructor(
    private _http: HttpClient,
    @Inject(ApiToken) private _api: string
  ) {}

  public getResources(page = 1): Observable<IListResponse<IResource>> {
    const params = new HttpParams().set('page', page);
    const headers = { 'Cache-Control': 'no-cache' };

    return this._http.get<IListResponse<IResource>>(`${this._api}unknown`, {
      params,
      headers,
    });
  }
}
