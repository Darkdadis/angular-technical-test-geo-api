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
  private regionSelectedSignal = signal<RegionModel>({ code: '', nom: '', score: 0 });
  private departementSelectedSignal = signal<DepartementModel>({ code: '', nom: '', codeRegion: '' });

  constructor(private http: HttpClient) { }


  //------------------------GETTER FOR SIGNALS-------------------------

  /**
   * Retrieves the readonly signal for regions.
   *
   * @return {ReadonlySignal} A readonly signal that represents regions.
   */
  get regions() {
    return this.regionsSignal.asReadonly();
  }

  /**
   * Retrieves a read-only signal representing the departments.
   *
   * @return {ReadonlySignal} A read-only signal of the departments.
   */
  get departements() {
    return this.departementsSignal.asReadonly();
  }

  /**
   * Retrieves a read-only signal representing the current communes.
   *
   * @return {ReadonlySignal} A read-only signal of the communes.
   */
  get communes() {
    return this.communesSignal.asReadonly();
  }

  /**
   * Getter for the currently selected department.
   *
   * @return {ReadonlySignal} The readonly signal object representing the selected department.
   */
  get departementSelected() {
    return this.departementSelectedSignal.asReadonly();
  }

  /**
   * Retrieves the read-only signal representing the selected region.
   *
   * @return {ReadonlySignal} A read-only signal containing the currently selected region.
   */
  get regionSelected() {
    return this.regionSelectedSignal.asReadonly();
  }

  //-------------------------CALL API---------------------------------------

  /**
   * Searches for a region using its name and fetches corresponding data from the API.
   *
   * @param {string} regionName - The name of the region to search for.
   * @return {void} This method does not return a value, but updates the regionsSignal property with the data retrieved or an empty array in case of an error.
   */
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

  /**
   * Fetches the departments associated with a specific region code from the API.
   *
   * @param {string} regionCode - The code of the region for which departments are to be retrieved.
   * @return {void} No return value. Updates internal state with the fetched data or an empty array on error.
   */
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

  /**
   * Fetches the list of communes associated with a specific department code.
   * The data is retrieved from the official French government's geo API.
   *
   * @param {string} departementCode - The code of the department for which communes are to be fetched.
   * @return {void} This method does not return a value directly; it updates the internal state with the fetched communes data.
   */
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


  /**
   * Sets the selected region to the provided region model.
   *
   * @param {RegionModel} region - The region model to be set as selected.
   * @return {void} Does not return a value.
   */
  setSelectedRegion(region: RegionModel) {
    this.regionSelectedSignal.set(region);
  }

  /**
   * Sets the selected department by updating the corresponding signal with the provided department model.
   *
   * @param {DepartementModel} departement - The department model to set as the selected department.
   * @return {void} No return value.
   */
  setSelectedDepartement(departement: DepartementModel) {
    this.departementSelectedSignal.set(departement);
  }

  /**
   * Resets the list of communes to an empty array by updating the internal signal state.
   *
   * @return {void} Does not return a value.
   */
  resetCommunes() {
    this.communesSignal.set([]);
  }

}
