import {Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeoApiService {
  private regionsSignal = signal<any[]>([]);
  private departementsSignal = signal<any[]>([]);

  constructor(private http: HttpClient) { }

  get regions() {
    return this.regionsSignal.asReadonly();
  }

  searchRegion(regionName: string) {
    const url = `https://geo.api.gouv.fr/regions?nom=${encodeURIComponent(regionName)}`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => this.regionsSignal.set(data),
      error: (err) => {
        console.error('API error:', err);
        this.regionsSignal.set([]);
      }
    });
  }



  get departements() {
    return this.departementsSignal.asReadonly();
  }

  searchDistrict(regionCode: string) {
    const url = `https://geo.api.gouv.fr/regions/${regionCode}/departements`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.departementsSignal.set(data);
        console.log('this.regions ======> ', this.regions());
        console.log(this.departements());
      },
      error: (err) => {
        console.error('API error:', err);
        this.departementsSignal.set([]);
      }
    });
  }

}
