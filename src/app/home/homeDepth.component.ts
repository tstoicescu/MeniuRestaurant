import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from '../item-menu/ItemMeniuComponent';
import { itemMeniu } from '../itemMeniu';
import { MenuService } from '../menuService';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenuItemComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <input type="text" placeholder="nu include alergenii" #filter_alergeni />

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

  filterResults(text: string, text_alergeni: string) {
    if (!text && !text_alergeni) {
      this.filteredMenuItemList = this.menuItemList;
    }
     
      this.filteredMenuItemList = this.menuItemList.filter((menuItem) =>
          (menuItem?.DENUMIRE.toLowerCase().includes(text.toLowerCase()) 
           || text.trim().length == 0 )
        && 
          (!menuItem?.LISTA_ALERGENI.toLowerCase().includes(text_alergeni.toLowerCase()) 
          || text_alergeni.trim().length == 0) 

    )
    
  }


  constructor(private router: Router) {
    const menuItemID = parseInt(this.route.snapshot.params['id'], 10);
    this.menuService.getMenuItemById(menuItemID).then((menuItemList) => {
      this.menuItemList = menuItemList;
      console.log(menuItemList);

      this.filteredMenuItemList = menuItemList;
      if (this.menuItemList.length == 0)
        document.location.href = document.location.href + '/DETALII';
    });
    /*const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById();*/
  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
      }
    });
  }
}
