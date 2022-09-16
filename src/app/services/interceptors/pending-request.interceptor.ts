import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { LoaderService } from '../loader.service';

@Injectable()
export class PendingRequestInterceptor implements HttpInterceptor {
  private readonly pendingReq = new Map();

  constructor(private _loadService: LoaderService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (!(event instanceof HttpResponse)) {
          this.pendingReq.set(req, true);
          this._loadService.loadingChange(this.pendingReq.size > 0);
        }
      }),
      finalize(() => {
        this.pendingReq.delete(req);
        this._loadService.loadingChange(this.pendingReq.size > 0);
      })
    );
  }
}
