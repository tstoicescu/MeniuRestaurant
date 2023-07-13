import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { HomeDepthComponent } from './home/homeDepth.component';
const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: HomeDepthComponent,
    title: 'Home details',
  },
  {
    path: 'details/:id/TEST',
    component: DetailsComponent,
    title: 'App details',
  },
];

export default routeConfig;
