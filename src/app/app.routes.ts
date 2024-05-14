import { Routes } from '@angular/router';
import { blockGuard } from './core/guards/block.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [blockGuard],
    loadComponent: () =>
      import(
        './pages/auth/components/login/login-container/login-container.component'
      ).then(c => c.LoginContainerComponent),
  },
  {
    path: 'register',
    canActivate: [blockGuard],
    loadComponent: () =>
      import(
        './pages/auth/components/register/register-container/register-container.component'
      ).then(c => c.RegisterContainerComponent),
  },
  {
    path: 'my',
    loadComponent: () =>
      import('./pages/home/home.component').then(c => c.HomeComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/components/profile/profile.component').then(
        c => c.ProfileComponent,
      ),
  },
];
