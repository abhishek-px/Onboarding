import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlankComponent } from './layout/blank/blank.component';
import { FullComponent } from './layout/full/full.component';

import { AuthGuard } from '../app/_helpers';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    redirectTo: '/admin/auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'admin/auth',
        loadChildren: () =>
          import('./components/auth/auth-routing.module').then(
            (m) => m.AuthRoutingModule
          ),
      },
    ],
  },
  {
    path: 'admin',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./components/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'banner',
        loadChildren: () =>
          import('./components/banner/banner.module').then(
            (m) => m.BannerModule
          ),
      },
      {
        path: 'banner',
        loadChildren: () =>
          import('./components/banner/banner.module').then(
            (m) => m.BannerModule
          ),
      },
    ],
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
