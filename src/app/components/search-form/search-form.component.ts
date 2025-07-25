import {Component, Signal} from '@angular/core';
import {SearchbarComponent} from "../searchbar/searchbar.component";
import {MatList, MatListItem} from '@angular/material/list';
import {GeoApi} from '../../services/geo-api.service';
import {DepartementModel} from '../../models/departement.model';
import { Router } from '@angular/router';
import {RegionModel} from '../../models/region.model';

@Component({
  selector: 'app-search-form',
  imports: [
    SearchbarComponent,
    MatList,
    MatListItem
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {

  departements: Signal<DepartementModel[]>;
  selectedRegion: Signal<RegionModel>;

  constructor(
    private geoApiService: GeoApi,
    private router: Router
    ) {
    this.departements = geoApiService.departements;
    this.selectedRegion = geoApiService.regionSelected;
  }

  /**
   * Handles the selection of a department. Sets the selected department and navigates to the corresponding communes view.
   *
   * @param {DepartementModel} departement - The department object that has been selected.
   * @return {void} This method does not return a value.
   */
  onSelectDepartment(departement: DepartementModel) {
    this.geoApiService.setSelectedDepartement(departement);
    this.router.navigate(['/communes', departement.code]);
  }
}
