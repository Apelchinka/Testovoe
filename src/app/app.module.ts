import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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

const routes: Routes = [
  {
    path: 'users-and-resources/:usersPage/:resourcesPage',
    component: UsersAndResourcesComponent,
  },
  { path: 'user/:id', component: UserComponent },
  { path: '', redirectTo: 'users-and-resources/1/1', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, UsersAndResourcesComponent, UserComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
  ],
  providers: [UsersService, ResourcesService, ListService],
  bootstrap: [AppComponent],
})
export class AppModule {}
