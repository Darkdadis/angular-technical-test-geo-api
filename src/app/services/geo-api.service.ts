import {Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RegionModel} from '../models/region.model';

@Injectable({
  providedIn: 'root'
})
export class GeoApiService {
  private regionsSignal = signal<any[]>([]);
  private departementsSignal = signal<any[]>([]);
  private regionSelectedSignal  = signal<RegionModel>({
    code: '',
    nom: '',
    score: 0
  });

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

  get regionSelected() {
    return this.regionSelectedSignal.asReadonly();
  }

  setSelectedRegion(region: RegionModel) {
    this.regionSelectedSignal.set(region);
  }



  get departements() {
    return this.departementsSignal.asReadonly();
  }

  searchDepartements(regionCode: string) {
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
