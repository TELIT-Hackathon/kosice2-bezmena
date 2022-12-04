import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'offers',
        loadChildren: () =>
          import('./modules/offers/offers.module').then(
            (m) => m.OffersModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./modules/register/register.module').then(
            (m) => m.RegisterModule
          ),
      },
      { path: '**', redirectTo: 'offers' },
    ],
  },
  { path: '**', redirectTo: 'offers' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
