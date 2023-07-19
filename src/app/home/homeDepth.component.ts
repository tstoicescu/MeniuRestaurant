import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from '../item-menu/ItemMeniuComponent';
import { itemMeniu } from '../itemMeniu';
import { MenuService } from '../menuService';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

import { FormControl } from '@angular/forms';
import {NgFor} from '@angular/common';
import { MatSelectModule }  from '@angular/material/select'; 
import { MatFormFieldModule }  from '@angular/material/form-field'; 


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, NgFor, CommonModule, MenuItemComponent],
  template: `
    <section>
    <form>
        <input type="text" placeholder="Filter by city" #filter />
        <input
          type="text"
          placeholder="nu include alergenii"
          #filter_alergeni
        />

        <!--mat-form-field>
  <mat-label>Toppings</mat-label-->
  <mat-select  multiple>
    <mat-option *ngFor="let topping of toppingList" [value]="topping">{{topping}}</mat-option>
  </mat-select>
  <!--/mat-form-field-->



        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value, filter_alergeni.value)"
        >
          Search
        </button>
        </form>
    </section>
    <section class="results">
      <app-housing-location
      *ngFor="let menuItem of filteredMenuItemList"
        [itemMeniu]="menuItem"
      >
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})

export class HomeDepthComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  menuService: MenuService = inject(MenuService);
  menuItemList: itemMeniu[] = [];
  filteredMenuItemList: itemMeniu[] = [];


  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  /*
  filterResults(text: string, text_alergeni: string) {
    if (!text && !text_alergeni) {
      this.filteredMenuItemList = this.menuItemList;
    }

    this.filteredMenuItemList = this.menuItemList.filter(
      (menuItem) =>
        (menuItem?.DENUMIRE.toLowerCase().includes(text.toLowerCase()) ||
          text.trim().length == 0) &&
        (!menuItem?.LISTA_ALERGENI.toLowerCase().includes(
          text_alergeni.toLowerCase()
        ) ||
          text_alergeni.trim().length == 0)
    );
  }
  */
  


  
  filterResults(text: string, text_alergeni: string) {
    if (!text && !text_alergeni) {
      this.filteredMenuItemList = this.menuItemList;
    }

    this.filteredMenuItemList = this.menuItemList.filter(
      (menuItem) => {
        let vIncludeInLista = true;

        // testam includerea dupa descriere
        if (text.trim().length > 0 )
          vIncludeInLista = menuItem?.DENUMIRE.toLowerCase().includes(text.toLowerCase());
        
        // daca elementul trebuie inclus, facem testul cu aleregnii
        if (vIncludeInLista && text_alergeni.trim().length > 0)
          vIncludeInLista = !menuItem?.LISTA_ALERGENI.toLowerCase().includes(text_alergeni.toLowerCase());

        return vIncludeInLista;
        }
    );
  }
  
  


  //preluam ID-ul item-ului din meniu din router si initializam lista cu iteme din meniu.
  constructor(private router: Router) {
    const menuItemID = parseInt(this.route.snapshot.params['id'], 10);
    this.menuService.getMenuItemById(menuItemID).then((menuItemList) => {
      this.menuItemList = menuItemList;
      console.log(menuItemList);

      this.filteredMenuItemList = menuItemList;
      //metoda workaround pentru a intra in meniul de detalii
      /*
      if (this.menuItemList.length == 0) {
        this.router.navigate(['DETALII'], {
          relativeTo: this.route,
        });
      }*/
    });
    /*const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById();*/
  }



  //dam refresh la pagina automat.
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
      }
    });

    
  }




}
