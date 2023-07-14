import { Injectable } from '@angular/core';
import { itemMeniu } from './itemMeniu';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  credentials = 'admin:123';
  constructor() {}

  //'http://proiecte.datalight.ro/DataLight/restaurant/meniu?IDMagazin=1&$FORMAT=json&$SELECT=IDMENIU,IDMENIU_PARINTE,DENUMIRE,DENUMIRE_PARINTE,CODMRF,DESCRIERE,INGREDIENTE,CANT_PORTIE,NRPICT,LISTA_ALERGENI,DISPONIBILITATE,COMPOZITIE100_PROTIDE,COMPOZITIE100_LIPIDE,COMPOZITIE100_GLUCIDE,COMPOZITIE100_CALORII';
  url =
    'http://proiecte.datalight.ro/DataLight/restaurant/meniu?IDMagazin=1&$FORMAT=json&$SELECT=IDMENIU,IDMENIU_PARINTE,DENUMIRE,DENUMIRE_PARINTE,CODMRF,DESCRIERE,INGREDIENTE,CANT_PORTIE,PUA_CANT_PORTIE,NRPICT,LISTA_ALERGENI,DISPONIBILITATE,COMPOZITIE100_PROTIDE,COMPOZITIE100_LIPIDE,COMPOZITIE100_GLUCIDE,COMPOZITIE100_CALORII,UM';
  async getAllMenuItems(): Promise<itemMeniu[]> {
    const filt = '&$FILTER=IDMENIU_PARINTE eq 0';
    const inturl = this.url + filt;
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(this.credentials));

    const options: RequestInit = {
      method: 'GET',
      headers: headers,
    };

    const response = await fetch(inturl, options);

    // console.log(response);
    const data = await response.json();

    // const results = data && data.results ? data.results : [];
    const results = data.d.results;
    console.log(results);
    return results;
  }

  /* async getPictureInfo(id: number): Promise<pictureLocation | undefined> {
    this.url =
      'http://proiecte.datalight.ro/DataLight/restaurant/MeniuPictures?IDMeniu=12&$FORMAT=json';
    const credentials = 'admin:123';
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(credentials));

    const options: RequestInit = {
      method: 'GET',
      headers: headers,
    };

    const response = await fetch(this.url, options);

    // console.log(response);
    const data = await response.json();

    // const results = data && data.results ? data.results : [];
    const results = data.d.results;
    console.log(results);
    return results;
  }*/

  async getMenuItemById(id: number): Promise<itemMeniu[]> {
    /*console.log(`${this.url}/${id}`);
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};*/
    console.log(id);
    const filt = '&$FILTER=IDMENIU_PARINTE eq ' + id;
    const inturl = this.url + filt;
    /*const picurl =
      'http://proiecte.datalight.ro/DataLight/restaurant/MeniuPictures?IDMeniu=' +
      11 +
      '&$FORMAT=json';*/
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(this.credentials));

    const options: RequestInit = {
      method: 'GET',
      headers: headers,
    };

    let response = await fetch(inturl, options);
    let data = await response.json();
    let results = data.d.results;
    //console.log(results);
    for (const a in results) {
      var nrpict = +results[a].NRPICT;

      //console.log(results[a].IDMENIU);

      if (nrpict > 0) {
        console.log('Are poze!');

        let picurl =
          'http://proiecte.datalight.ro/DataLight/restaurant/MeniuPictures?IDMeniu=' +
          results[a].IDMENIU +
          '&$FORMAT=json&$SELECT=PICTURE';
        response = await fetch(picurl, options);
        data = await response.json();
        //results[a].PICTURE = picurl;
        results[a].PICTURE = data.d.results[0].PICTURE;
      }
    }

    //results[0].PICTURE = data.d.results[0].PICTURE;
    return results;
  }

  async getItemDetailsByID(id: number): Promise<itemMeniu> {
    const filt = '&$FILTER=IDMENIU eq ' + id;
    const inturl = this.url + filt;
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(this.credentials));

    const options: RequestInit = {
      method: 'GET',
      headers: headers,
    };

    let response = await fetch(inturl, options);
    // console.log(response);
    let data = await response.json();

    // const results = data && data.results ? data.results : [];
    const results = data.d.results;
    var nrpict = +results[0].NRPICT;

    if (nrpict > 0) {
      console.log('Are poze!');

      let picurl =
        'http://proiecte.datalight.ro/DataLight/restaurant/MeniuPictures?IDMeniu=' +
        results[0].IDMENIU +
        '&$FORMAT=json&$SELECT=PICTURE';
      console.log(picurl);
      response = await fetch(picurl, options);
      data = await response.json();
      results[0].PICTURE = data.d.results[0].PICTURE;
    }

    console.log(results[0]);
    return results[0];
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
  }
}

/*function calculateDepth(obj: any): number {
  if (typeof obj !== 'object' || obj === null) {
    return 0;
  }

  let maxDepth = 0;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const depth = calculateDepth(obj[key]) + 1;
      maxDepth = Math.max(maxDepth, depth);
    }
  }

  return maxDepth;
}*/
