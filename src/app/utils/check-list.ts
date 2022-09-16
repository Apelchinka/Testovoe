import { IListResponse } from '../models/list-response.model';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

export function checkList<T>(
  [response, concomitantPage]: [IListResponse<T>, number],
  listType: string,
  router: Router
): Observable<IListResponse<T> | never> {
  if (response.data.length) {
    return of(response);
  } else {
    if (response.page > 1) {
      const redirectRoute =
        listType === 'users'
          ? `users-and-resources/${response.total_pages}/${concomitantPage}`
          : `users-and-resources/${concomitantPage}/${response.total_pages}`;
      router.navigate([redirectRoute]);

      return EMPTY;
    } else {
      return throwError(() => 'Users not found');
    }
  }
}
