import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthorizationComponent } from './authorization.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationComponent,
    children: [
      { path: 'sign-in', component: SignInComponent, title: 'Sign in' },
      { path: 'sign-up', component: SignUpComponent, title: 'Sign up' },
    ],
  },
  {
    path: '**',
    redirectTo: 'sign-up',
  },
];

@NgModule({
  declarations: [SignInComponent, SignUpComponent, AuthorizationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
})
export class AuthorizationModule {}
