import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatFormField, MatInput} from '@angular/material/input';
import { GeoApiService} from '../../services/geo-api.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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

  onOptionSelected(code: string) {
    console.log('value selected', code);
    if (code) {
      this.geoApiService.searchDistrict(code);
    } else {
      this.geoApiService['departementsSignal'].set([]);
    }
  }

  displayRegion(region: any): string {
    return region && region.nom ? region.nom : '';
  }
}
