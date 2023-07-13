import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { itemMeniu } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import * as fct from '../housing-location/ItemMeniuComponent';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="safeURL"
        alt="De ce nu vrei sa bagi poza bro?"
      />

      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation.DENUMIRE }}</h2>
        <p class="listing-location">
          {{ SelectDacaBucata() }},
          {{ SelectDacaPret() }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">Despre acest produs din meniu</h2>
        <ul>
          <p>{{ housingLocation.DESCRIERE }}</p>
          <p>{{ housingLocation.INGREDIENTE }}</p>
          <p>{{ housingLocation.LISTA_ALERGENI }}</p>
        </ul>
      </section>
      <!--
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
--></article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  safeURL: SafeResourceUrl = '';
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: itemMeniu = {} as itemMeniu;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  SelectDacaPret() {
    if (this.housingLocation.PUA_CANT_PORTIE == 0) return '';
    else return this.housingLocation.PUA_CANT_PORTIE + ' RON';
  }
  SelectDacaBucata() {
    if (this.housingLocation.CANT_PORTIE == 0) return this.housingLocation.UM;
    else
      return this.housingLocation.CANT_PORTIE + ' ' + this.housingLocation.UM;
  }
  constructor(private sanitizer: DomSanitizer) {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    console.log(housingLocationId);
    this.housingService
      .getItemDetaliiByID(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
        console.log(housingLocation);
      });
  }
  ngOnInit() {
    let unsafeURL = `data: image/png;base64, ${this.housingLocation.PICTURE}`;

    console.log(unsafeURL);
    console.log(typeof this.housingLocation.PICTURE);
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeURL);
  }

  /*constructor() {
    //  const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    console.log(this.housingLocation);
  }*/

  submitApplication() {
    /*this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );*/
  }
}
