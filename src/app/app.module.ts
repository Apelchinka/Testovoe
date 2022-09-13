import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { UsersService } from './services/users.service';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { GenerateNumbersPagesPipe } from './pipes/generate-numbers-pages.pipe';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  { path: ':page', component: UsersComponent },
  { path: 'user/:id', component: UserComponent },
  { path: '', redirectTo: '/1', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    GenerateNumbersPagesPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
  ],
  providers: [UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
