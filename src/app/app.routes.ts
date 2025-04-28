import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'breeds',
    loadComponent: () => import('./pages/breeds-list/breeds-list.component').then(c => c.BreedsListComponent)
  }
];
