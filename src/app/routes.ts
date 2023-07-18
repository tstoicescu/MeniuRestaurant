import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { HomeDepthComponent } from './home/homeDepth.component';
const routeConfig: Routes = [
  //path-ul catre pagina home.
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  //path-ul catre pagina de 'adancime' a home-ului
  {
    path: 'details/:id',
    component: HomeDepthComponent,
    title: 'Home details',
  },
  //path-ul catre pagina cu detalii
  {
    path: 'menudetails/:id',
    component: DetailsComponent,
    title: 'Menu item details',
  },
];

export default routeConfig;
