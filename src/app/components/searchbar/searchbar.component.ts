import {Component, Signal} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatFormField, MatInput} from '@angular/material/input';
import { GeoApi} from '../../services/geo-api.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {RegionModel} from '../../models/region.model';

@Component({
  selector: 'app-searchbar',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatAutocompleteTrigger,
    MatInput,
    MatAutocomplete,
    MatOption,
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  searchControl: FormControl<string | null> = new FormControl('');
  regions: Signal<RegionModel[]>;

  constructor(private geoApiService: GeoApi) {
    this.regions = this.geoApiService.regions;
    this.initFormControl()
  }

  /**
   * Initializes and sets up the form control to listen for changes in its value.
   * The method applies debounce and distinctUntilChanged operators to reduce unnecessary calls
   * and triggers the region search functionality in the Geo API service.
   *
   * @return {void} Does not return a value.
   */
  initFormControl() {
    this.searchControl.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(value => {
      if (value) {
        this.geoApiService.searchRegion(value);
      } else {
        this.geoApiService['regionsSignal'].set([]);
      }
    });
  }

  /**
   * Handles the selection of a region and updates related data accordingly.
   *
   * @param {RegionModel} region - The selected region model containing the region details.
   * @return {void} Does not return any value.
   */
  onOptionSelected(region: RegionModel) {
    if (region.code) {
      this.geoApiService.setSelectedRegion(region);
      this.geoApiService.searchDepartements(region.code);
    } else {
      this.geoApiService['departementsSignal'].set([]);
    }
  }

  displayRegion(region: RegionModel): string {
    return region && region.nom ? region.nom : '';
  }
}
