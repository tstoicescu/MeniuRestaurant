import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { itemMeniu } from '../itemMeniu';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HtmlParser } from '@angular/compiler';
//import {Input} from
@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        j
        [src]="safeURL"
        alt="Not Found"
        onerror="this.src='assets/logo_restaurant.png';"
      />
      <h2 class="listing-heading">{{ itemMeniu.DENUMIRE }}</h2>
      <div class="listing-location">
        <p>{{ SelectIfPrice() }}</p>
        <p>{{ SelectIfBucata() }}</p>
        <p>{{ itemMeniu.DISPONIBILITATE }}</p>
      </div>
      <div class="linkul">
        <a [routerLink]="[route, itemMeniu.IDMENIU]"> Learn More </a>
      </div>
      <!--<a [routerLink]="['/details', itemMeniu.IDMENIU]"> Learn More </a> -->
    </section>
  `,
  styleUrls: ['./itemMeniuComponent.css'],
})
export class MenuItemComponent {
  safeURL: SafeResourceUrl = '';
  innerHTML: string = `<p>Hello, world!</p>`;
  route = '/details';
  @Input() itemMeniu!: itemMeniu;

  //Selectam linkul corect spre a fi construit
  SelectRoute() {
    if (this.itemMeniu.CODMRF != 0) this.route = '/menudetails';
  }
  //Functii pentru a filtra informatii corecte spre a fi afisate.
  SelectIfPrice() {
    if (this.itemMeniu.PUA_CANT_PORTIE == 0) return '';
    else return this.itemMeniu.PUA_CANT_PORTIE + ' RON';
  }
  SelectIfBucata() {
    if (this.itemMeniu.CANT_PORTIE == 0) return this.itemMeniu.UM;
    else return this.itemMeniu.CANT_PORTIE + ' ' + this.itemMeniu.UM;
  }

  //folosim domsanitizer pentru a trece de protocoalele de securitate.
  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit() {
    //ocolim protocoalele de securitate pentru datele pozei.
    let unsafeURL = `data: image/png;base64, ${this.itemMeniu.PICTURE}`;
    // console.log(unsafeURL);
    // console.log(typeof this.housingLocation.PICTURE);
    // console.log(this.housingLocation);
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeURL);
    //Selectam ruta corespunzatoare.
    this.SelectRoute();
  }
}
