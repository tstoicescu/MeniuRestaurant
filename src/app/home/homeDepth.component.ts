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
        <input
          type="text"
          placeholder="nu include alergenii"
          #filter_alergeni
        />

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
  //dropdownSettings: any = {};


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
        if (vIncludeInLista && text_alergeni.trim().length > 0);
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

    // vector cu tarile din exemplul cu dropdown multiplu
    // la implementare pe datele noastre trebuie sa il eliminam de aici
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
  }




}
