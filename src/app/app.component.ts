import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';
import { LoaderService } from './services/loader.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public userProfile$ = this._authService.userProfile$;
  public loading$ = this._loadService.loading$.pipe(debounceTime(60));

  constructor(
    private _authService: AuthorizationService,
    private _loadService: LoaderService
  ) {}

  ngOnInit(): void {
    this._authService.checkAuth().subscribe();
  }

  public logout(): void {
    this._authService.logout();
  }
}
