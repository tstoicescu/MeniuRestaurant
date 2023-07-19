import { Injectable } from '@angular/core';
import { itemMeniu } from './housinglocation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pictureLocation } from './pictureLocation';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  /*
  housingLocationList: HousingLocation[] = [
    {
      id: 0,
      name: 'Acme Fresh Start Housing',
      city: 'Chicago',
      state: 'IL',
      photo: '/assets/bernard-hermant-CLKGGwIBTaY-unsplash.jpg',
      availableUnits: 4,
      wifi: true,
      laundry: true
    },
    {
      id: 1,
      name: 'A113 Transitional Housing',
      city: 'Santa Monica',
      state: 'CA',
      photo: '/assets/brandon-griggs-wR11KBaB86U-unsplash.jpg',
      availableUnits: 0,
      wifi: false,
      laundry: true
    },
    {
      id: 2,
      name: 'Warm Beds Housing Support',
      city: 'Juneau',
      state: 'AK',
      photo: '/assets/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg',
      availableUnits: 1,
      wifi: false,
      laundry: false
    },
    {
      id: 3,
      name: 'Homesteady Housing',
      city: 'Chicago',
      state: 'IL',
      photo: '/assets/ian-macdonald-W8z6aiwfi1E-unsplash.jpg',
      availableUnits: 1,
      wifi: true,
      laundry: false
    },
    {
      id: 4,
      name: 'Happy Homes Group',
      city: 'Gary',
      state: 'IN',
      photo: '/assets/krzysztof-hepner-978RAXoXnH4-unsplash.jpg',
      availableUnits: 1,
      wifi: true,
      laundry: false
    },
    {
      id: 5,
      name: 'Hopeful Apartment Group',
      city: 'Oakland',
      state: 'CA',
      photo: '/assets/r-architecture-JvQ0Q5IkeMM-unsplash.jpg',
      availableUnits: 2,
      wifi: true,
      laundry: true
    },
    {
      id: 6,
      name: 'Seriously Safe Towns',
      city: 'Oakland',
      state: 'CA',
      photo: '/assets/phil-hearing-IYfp2Ixe9nM-unsplash.jpg',
      availableUnits: 5,
      wifi: true,
      laundry: true
    },
    {
      id: 7,
      name: 'Hopeful Housing Solutions',
      city: 'Oakland',
      state: 'CA',
      photo: '/assets/r-architecture-GGupkreKwxA-unsplash.jpg',
      availableUnits: 2,
      wifi: true,
      laundry: true
    },
    {
      id: 8,
      name: 'Seriously Safe Towns',
      city: 'Oakland',
      state: 'CA',
      photo: '/assets/saru-robert-9rP3mxf8qWI-unsplash.jpg',
      availableUnits: 10,
      wifi: false,
      laundry: false
    },
    {
      id: 9,
      name: 'Capital Safe Towns',
      city: 'Portland',
      state: 'OR',
      photo: '/assets/webaliser-_TPTXZd9mOo-unsplash.jpg',
      availableUnits: 6,
      wifi: true,
      laundry: true
    }
  ];

   getAllHousingLocations(): HousingLocation[] {
    return this.housingLocationList;
  }

  getHousingLocationById(id: number): HousingLocation | undefined {
    return this.housingLocationList.find(housingLocation => housingLocation.id === id);
  }
  
  */

  // string credentiale= "admin:123@";
  constructor() {}

  credentials = 'admin:123';
  //'http://proiecte.datalight.ro/DataLight/restaurant/meniu?IDMagazin=1&$FORMAT=json&$SELECT=IDMENIU,IDMENIU_PARINTE,DENUMIRE,DENUMIRE_PARINTE,CODMRF,DESCRIERE,INGREDIENTE,CANT_PORTIE,NRPICT,LISTA_ALERGENI,DISPONIBILITATE,COMPOZITIE100_PROTIDE,COMPOZITIE100_LIPIDE,COMPOZITIE100_GLUCIDE,COMPOZITIE100_CALORII';
  url =
    'http://proiecte.datalight.ro/DataLight/restaurant/meniu?IDMagazin=1&$FORMAT=json&$SELECT=IDMENIU,IDMENIU_PARINTE,DENUMIRE,DENUMIRE_PARINTE,CODMRF,DESCRIERE,INGREDIENTE,CANT_PORTIE,PUA_CANT_PORTIE,NRPICT,LISTA_ALERGENI,DISPONIBILITATE,COMPOZITIE100_PROTIDE,COMPOZITIE100_LIPIDE,COMPOZITIE100_GLUCIDE,COMPOZITIE100_CALORII,UM';
  async getAllHousingLocations(): Promise<itemMeniu[]> {
    const filt = '&$FILTER=IDMENIU_PARINTE eq 0';
    const inturl = this.url + filt;
    const credentials = 'admin:123';
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(credentials));

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

  async getHousingLocationById(id: number): Promise<itemMeniu[]> {
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
    const credentials = 'admin:123';
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(credentials));

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

  async getItemDetaliiByID(id: number): Promise<itemMeniu> {
    const filt = '&$FILTER=IDMENIU eq ' + id;
    const inturl = this.url + filt;
    const credentials = 'admin:123';
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(credentials));

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
