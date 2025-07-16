import { Component } from '@angular/core';
import {SearchbarComponent} from "../searchbar/searchbar.component";
import {MatList, MatListItem} from '@angular/material/list';
import {GeoApiService} from '../../services/geo-api.service';
import {DepartementModel} from '../../models/departement.model';
import { Router } from '@angular/router';

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

  departements;
  selectedRegion;

  constructor(
    private geoApiService: GeoApiService,
    private router: Router
    ) {
    this.departements = geoApiService.departements;
    this.selectedRegion = geoApiService.regionSelected;
  }

  onSelectDepartment(departement: DepartementModel) {
    this.geoApiService.setSelectedDepartement(departement);
    this.router.navigate(['/communes', departement.code]);
  }
}
