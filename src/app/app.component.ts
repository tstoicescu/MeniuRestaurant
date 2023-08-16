import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatListModule} from '@angular/material/list'; 

import { ScrollDispatcher } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent, RouterModule,
    MatListModule, MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule ],
  template: `




  <main>
  <a [routerLink]="['/']">
        <header class="brand-name">
          <img
            class="brand-logo"
            src="/assets/Restaurant.svg"
            alt="logo"
            aria-hidden="true"
          />
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
      </main>


     
    
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';

   constructor(private scroll: ScrollDispatcher) {}
}
