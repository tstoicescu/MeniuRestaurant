import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { itemMeniu } from '../housinglocation';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
        alt="Exterior photo of {{ housingLocation.DENUMIRE }}"
      />
      <h2 class="listing-heading">{{ housingLocation.DENUMIRE }}</h2>
      <div class="listing-location">
        <p>
          {{ housingLocation.DESCRIERE }}
        </p>
        <p>
          {{ housingLocation.CANT_PORTIE }}
        </p>
        <p>
          {{ housingLocation.DISPONIBILITATE }}
        </p>
      </div>
      <a [routerLink]="['/details', housingLocation.IDMENIU]">Learn More</a>
    </section>
  `,
  styleUrls: ['./housing-location.component.css'],
})
export class HousingLocationComponent {
  safeURL: SafeResourceUrl = '';
  @Input() housingLocation!: itemMeniu;

  constructor(private sanitizer: DomSanitizer) {
    console.log('Merge constructoru frati');
  }
  ngOnInit() {
    let unsafeURL = `data: image/png;base64, ${this.housingLocation.PICTURE}`;

    console.log(unsafeURL);
    console.log(typeof this.housingLocation.PICTURE);
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeURL);
  }
}
