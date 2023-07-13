import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { itemMeniu } from '../housinglocation';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
      <h2 class="listing-heading">{{ housingLocation.DENUMIRE }}</h2>
      <div class="listing-location">
        <p>{{ SelectDacaPret() }}</p>
        <p>{{ SelectDacaBucata() }}</p>
        <p>
          {{ housingLocation.DISPONIBILITATE }}
        </p>
      </div>
      <a [routerLink]="['/details', housingLocation.IDMENIU]">Learn More</a>
    </section>
  `,
  styleUrls: ['./itemMeniuComponent.css'],
})
export class HousingLocationComponent {
  safeURL: SafeResourceUrl = '';
  @Input() housingLocation!: itemMeniu;

  SelectDacaPret() {
    if (this.housingLocation.PUA_CANT_PORTIE == 0) return '';
    else return this.housingLocation.PUA_CANT_PORTIE + ' RON';
  }
  SelectDacaBucata() {
    if (this.housingLocation.CANT_PORTIE == 0) return this.housingLocation.UM;
    else
      return this.housingLocation.CANT_PORTIE + ' ' + this.housingLocation.UM;
  }

  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit() {
    let unsafeURL = `data: image/png;base64, ${this.housingLocation.PICTURE}`;

    console.log(unsafeURL);
    console.log(typeof this.housingLocation.PICTURE);
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeURL);
  }
}
