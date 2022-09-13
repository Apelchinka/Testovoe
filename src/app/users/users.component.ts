import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import {
  BehaviorSubject,
  map,
  Observable,
  publishReplay,
  refCount,
  share,
  switchMap,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../models/user';
import { PageEvent } from '@angular/material/paginator';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users$: Observable<IUser[]>;
  public pageNumber$: Observable<number>;
  public pages$: Observable<
    Record<'total_pages' | 'per_page' | 'total', number>
  >;
  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private _userService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.pageNumber$ = this.activatedRoute.params.pipe(
      map(({ page }) => Number(page))
    );
    const users$ = this.pageNumber$.pipe(
      switchMap((pageNumber) => this._userService.getUsers(pageNumber)),
      share()
    );
    this.users$ = users$.pipe(map(({ data }) => data));
    this.pages$ = users$.pipe(
      map(({ total_pages, per_page, total }) => {
        console.log(total_pages);
        console.log(per_page);
        console.log(total);
        return { total_pages, per_page, total };
      })
    );
  }

  public goToUser(id: number): void {
    this.router.navigate([`user/${id}`]);
  }

  public changePage(page: PageEvent): void {
    console.log(page);
    this.router.navigate([page.pageIndex + 1]);
  }
}
