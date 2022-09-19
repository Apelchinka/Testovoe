import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class AbstractDestroyableComponent {
  protected destroyNotifier: Observable<void>;
  private _onDestroy = new Subject<void>();
  protected constructor() {
    this.destroyNotifier = this._onDestroy.asObservable();
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
