import { distinctUntilChanged, map, Observable } from 'rxjs';

export function getPageNumber(
  routerParams$: Observable<Record<string, string>>,
  pageKey: string
): Observable<number> {
  return routerParams$.pipe(
    map((routerParams) => {
      return Number(routerParams[pageKey]);
    }),
    distinctUntilChanged()
  );
}
