import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public readonly loading$: Observable<boolean>;
  private _loading = new BehaviorSubject<boolean>(false);
  constructor() {
    this.loading$ = this._loading.asObservable().pipe(distinctUntilChanged());
  }
  public loadingChange(loading: boolean) {
    this._loading.next(loading);
  }
}
