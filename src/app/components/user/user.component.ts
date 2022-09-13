import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { map, Observable } from 'rxjs';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  public user$: Observable<IUser>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.user$ = this.usersService
      .getUserApi(this.activatedRoute.snapshot.params['id'])
      .pipe(map(({ data }) => data));
  }

  ngOnInit(): void {}
}
