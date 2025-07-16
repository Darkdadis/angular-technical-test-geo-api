import {Injectable, Signal, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RegionModel} from '../models/region.model';
import {DepartementModel} from '../models/departement.model';
import {CommuneModel} from '../models/commune.model';

@Injectable({
  providedIn: 'root'
})
export class GeoApi {
  private regionsSignal = signal<RegionModel[]>([]);
  private departementsSignal = signal<DepartementModel[]>([]);
  private communesSignal = signal<CommuneModel[]>([]);
  private regionSelectedSignal = signal<RegionModel>({ code: '', nom: '', score: 0 });
  private departementSelectedSignal = signal<DepartementModel>({ code: '', nom: '', codeRegion: '' });

  constructor(private http: HttpClient) { }


  //------------------------GETTER FOR SIGNALS-------------------------

  get regions() {
    return this.regionsSignal.asReadonly();
  }
  get departements() {
    return this.departementsSignal.asReadonly();
  }
  get communes() {
    return this.communesSignal.asReadonly();
  }
  get departementSelected() {
    return this.departementSelectedSignal.asReadonly();
  }
  get regionSelected() {
    return this.regionSelectedSignal.asReadonly();
  }

  //-------------------------CALL API---------------------------------------

  searchRegion(regionName: string) {
    const url = `https://geo.api.gouv.fr/regions?nom=${encodeURIComponent(regionName)}`;
    this.http.get<RegionModel[]>(url).subscribe({
      next: data => this.regionsSignal.set(data),
      error: (err) => {
        console.error('API error:', err);
        this.regionsSignal.set([]);
      }
    });
  }

  searchDepartements(regionCode: string) {
    const url = `https://geo.api.gouv.fr/regions/${regionCode}/departements`;
    this.http.get<DepartementModel[]>(url).subscribe({
      next: data => {
        this.departementsSignal.set(data);
      },
      error: (err) => {
        console.error('API error:', err);
        this.departementsSignal.set([]);
      }
    });
  }

  searchCommunes(departementCode: string) {
    const url = `https://geo.api.gouv.fr/departements/${departementCode}/communes?fields=code,nom,codesPostaux`;
    this.http.get<CommuneModel[]>(url).subscribe({
      next: data => {
        this.communesSignal.set(data);
      }, error: (err) => {
        console.error('API error:', err);
        this.communesSignal.set([]);
      }
    })
  }

  //------------------------SET SELECTED VALUE----------------------------


  setSelectedRegion(region: RegionModel) {
    this.regionSelectedSignal.set(region);
  }

  setSelectedDepartement(departement: DepartementModel) {
    this.departementSelectedSignal.set(departement);
  }

  resetCommunes() {
    this.communesSignal.set([]);
  }

}
