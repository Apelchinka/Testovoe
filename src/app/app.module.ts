import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { ResourcesService } from './services/resources.service';
import { UsersService } from './services/users.service';
import { UsersAndResourcesComponent } from './components/users-and-resources/users-and-resources.component';
import { UserComponent } from './components/user/user.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ListService } from './services/list.service';
import { MatButtonModule } from '@angular/material/button';
import { ModalComponent } from './components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { PendingRequestInterceptor } from './services/interceptors/pending-request.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiToken } from './tokens/api.token';
import { environment } from '../environments/environment';
import { UserDataResolver } from './services/resolvers/user-data.resolver';
import { UserTitleResolver } from './services/resolvers/user-title.resolver';

const routes: Routes = [
  {
    path: 'authorization',
    loadChildren: () =>
      import('./modules/authorization/authorization.module').then(
        (m) => m.AuthorizationModule
      ),
  },
  {
    path: 'users-and-resources/:usersPage/:resourcesPage',
    component: UsersAndResourcesComponent,
    title: 'Users and resources',
  },
  {
    path: 'user/:id',
    component: UserComponent,
    title: UserTitleResolver,
    resolve: { userData: UserDataResolver },
  },
  { path: '**', redirectTo: 'users-and-resources/1/1', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    UsersAndResourcesComponent,
    UserComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    UsersService,
    ResourcesService,
    ListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PendingRequestInterceptor,
      multi: true,
    },
    { provide: ApiToken, useValue: environment.api },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
