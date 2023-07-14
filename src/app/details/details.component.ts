import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../menuService';
import { itemMeniu } from '../itemMeniu';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="safeURL"
        alt="Nu s-a putut adauga poza."
      />

      <section class="listing-description">
        <h2 class="listing-heading">{{ menuItm.DENUMIRE }}</h2>
        <p class="listing-location">
          {{ SelectDacaBucata() }},
          {{ SelectDacaPret() }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">Despre acest produs din meniu</h2>
        <ul>
          <p>{{ menuItm.DESCRIERE }}</p>
          <p>{{ menuItm.INGREDIENTE }}</p>
          <p>{{ menuItm.LISTA_ALERGENI }}</p>
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
  menuService: MenuService = inject(MenuService);
  menuItm: itemMeniu = {} as itemMeniu;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  SelectDacaPret() {
    if (this.menuItm.PUA_CANT_PORTIE == 0) return '';
    else {
      console.log(this.menuItm.PICTURE);
      return this.menuItm.PUA_CANT_PORTIE + ' RON';
    }
  }
  SelectDacaBucata() {
    if (this.menuItm.CANT_PORTIE == 0) return this.menuItm.UM;
    else return this.menuItm.CANT_PORTIE + ' ' + this.menuItm.UM;
  }

  constructor(private sanitizer: DomSanitizer) {
    const menuItmId = Number(this.route.snapshot.params['id']);

    console.log(menuItmId);
    this.menuService.getItemDetailsByID(menuItmId).then((menuItm) => {
      this.menuItm = menuItm;
      console.log(menuItm);

      let unsafeURL = `data: image/png;base64, ${this.menuItm.PICTURE}`;

      console.log(unsafeURL);
      console.log(typeof this.menuItm.PICTURE);
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeURL);
    });
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
