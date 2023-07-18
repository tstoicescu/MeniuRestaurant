import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from '../item-menu/ItemMeniuComponent';
import { itemMeniu } from '../itemMeniu';
import { MenuService } from '../menuService';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenuItemComponent ],
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


  countries: Array<any> = [];
  selCountries = [
    {
      item_id: 1,
      item_text: "India",
      image: "http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg"
    },
    {
      item_id: 5,
      item_text: "Israel",
      image: "http://www.sciencekids.co.nz/images/pictures/flags96/Israel.jpg"
    }
  ];
  dropdownSettings: any = {};




  filterResults(text: string, text_alergeni: string) {
    if (!text 
        //&& !text_alergeni
        ) {
      this.filteredmenuItmList = this.menuItmList;
    }

    this.filteredmenuItmList = this.menuItmList.filter((menuItm) =>
      menuItm?.DENUMIRE.toLowerCase().includes(text.toLowerCase()) 
      //&& !menuItm?.LISTA_ALERGENI.toLowerCase().includes(text.toLowerCase())

    );
  }
  /*
  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }*/

  //initializam lista itemelor din meniu.
  constructor() {
    this.menuService.getAllMenuItems().then((menuItmList: itemMeniu[]) => {
      this.menuItmList = menuItmList;
      this.filteredmenuItmList = menuItmList;
    });
    /*const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById();*/
  }




  ngOnInit() {
    this.countries = [
      {
        item_id: 1,
        item_text: "India",
        image: "http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg"
      },
      {
        item_id: 2,
        item_text: "Spain",
        image: "http://www.sciencekids.co.nz/images/pictures/flags96/Spain.jpg"
      },
      {
        item_id: 3,
        item_text: "United Kingdom",
        image:
          "http://www.sciencekids.co.nz/images/pictures/flags96/United_Kingdom.jpg"
      },
      {
        item_id: 4,
        item_text: "Canada",
        image:
          "http://www.sciencekids.co.nz/images/pictures/flags96/Canada.jpg",
        isDisabled: true
      },
      {
        item_id: 5,
        item_text: "Israel",
        image: "http://www.sciencekids.co.nz/images/pictures/flags96/Israel.jpg"
      },
      {
        item_id: 6,
        item_text: "Brazil",
        image: "http://www.sciencekids.co.nz/images/pictures/flags96/Brazil.jpg"
      },
      {
        item_id: 7,
        item_text: "Barbados",
        image:
          "http://www.sciencekids.co.nz/images/pictures/flags96/Barbados.jpg"
      },
      {
        item_id: 8,
        item_text: "Mexico",
        image: "http://www.sciencekids.co.nz/images/pictures/flags96/Mexico.jpg"
      }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  get getItems() {
    return this.countries.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  onItemSelect(item: any) {
    console.log("onItemSelect", item);
  }
  onSelectAll(items: any) {
    console.log("onSelectAll", items);
  }

}
