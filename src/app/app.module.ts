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
import { SignInComponent } from './modules/authorization/components/sign-in/sign-in.component';
import { SignUpComponent } from './modules/authorization/components/sign-up/sign-up.component';
import { AuthorizationComponent } from './modules/authorization/authorization.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PendingRequestInterceptor } from './services/interceptors/pending-request.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiToken } from './tokens/api.token';
import { Environment } from '@angular/cli/lib/config/workspace-schema';
import { environment } from '../environments/environment';

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
  },
  { path: 'user/:id', component: UserComponent },
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
