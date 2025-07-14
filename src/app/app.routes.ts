import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { StatsComponent } from './pages/stats.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'stats', component: StatsComponent }
  ];
