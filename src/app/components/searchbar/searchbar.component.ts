import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatFormField, MatInput} from '@angular/material/input';
import { GeoApiService} from '../../services/geo-api.service';
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
  searchControl = new FormControl('');
  regions;


  constructor(private geoApiService: GeoApiService) {
    this.regions = this.geoApiService.regions;

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

  onOptionSelected(region: RegionModel) {
    console.log('value selected', region);
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
