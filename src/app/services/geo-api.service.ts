import {Injectable, signal} from '@angular/core';
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
  private regionSelectedSignal  = signal<RegionModel>({
    code: '',
    nom: '',
    score: 0
  });
  private departementSelectedSignal = signal<DepartementModel>({
    code: '',
    nom: '',
    codeRegion: ''
  })

  constructor(private http: HttpClient) { }


  //------------------------CALL API-------------------------

  get regions() {
    return this.regionsSignal.asReadonly();
  }

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

  get departements() {
    return this.departementsSignal.asReadonly();
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

  get communes() {
    return this.communesSignal.asReadonly();
  }

  resetCommunes() {
    this.communesSignal.set([]);
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

  get regionSelected() {
    return this.regionSelectedSignal.asReadonly();
  }

  setSelectedRegion(region: RegionModel) {
    this.regionSelectedSignal.set(region);
  }

  get departementSelected() {
    return this.departementSelectedSignal.asReadonly();
  }

  setSelectedDepartement(departement: DepartementModel) {
    this.departementSelectedSignal.set(departement);
  }

}
