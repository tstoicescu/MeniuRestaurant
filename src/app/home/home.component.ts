import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from '../item-menu/ItemMeniuComponent';
import { itemMeniu } from '../itemMeniu';
import { MenuService } from '../menuService';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenuItemComponent ],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <!--input type="text" placeholder="nu include alergenii" #filter_alergeni /-->

        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let menuItm of filteredmenuItmList"
        [itemMeniu]="menuItm"
      >
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  menuItmList: itemMeniu[] = [];
  menuService: MenuService = inject(MenuService);
  filteredmenuItmList: itemMeniu[] = [];


  


  filterResults(text: string) {
    if (!text 
        //&& !text_alergeni
        ) {
      this.filteredmenuItmList = this.menuItmList;
    }

    this.filteredmenuItmList = this.menuItmList.filter((menuItm) =>
      menuItm?.DENUMIRE.toLowerCase().includes(text.toLowerCase()) 
    );
  }


  //initializam lista itemelor din meniu.
  constructor() {
    this.menuService.getAllMenuItems().then((menuItmList: itemMeniu[]) => {
      this.menuItmList = menuItmList;
      this.filteredmenuItmList = menuItmList;
    });
    /*const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById();*/
  }




  
}
