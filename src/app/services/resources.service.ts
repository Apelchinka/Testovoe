import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListResponse } from '../models/list-response.model';
import { IResource } from '../models/resource.model';

@Injectable()
export class ResourcesService {
  constructor(private _http: HttpClient) {}

  public getResources(page = 1): Observable<IListResponse<IResource>> {
    const params = new HttpParams().set('page', page);
    return this._http.get<IListResponse<IResource>>(
      'https://reqres.in/api/unknown',
      {
        params,
      }
    );
  }
}
