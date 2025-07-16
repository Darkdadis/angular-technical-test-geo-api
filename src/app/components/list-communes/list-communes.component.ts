import {Component, Signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {GeoApi} from '../../services/geo-api.service';
import {MatList, MatListItem} from '@angular/material/list';
import {CommuneModel} from '../../models/commune.model';
import {DepartementModel} from '../../models/departement.model';

@Component({
  selector: 'app-list-communes',
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatListItem,
    MatList,
  ],
  templateUrl: './list-communes.component.html',
  styleUrl: './list-communes.component.scss'
})
export class ListCommunesComponent {
  departementCode!: string;
  communes: Signal<CommuneModel[]>;
  departementSelected: Signal<DepartementModel>;
  selectedLetter: string | null = null;

  constructor(
    private router: Router,
    private geoApiService: GeoApi,
    private route: ActivatedRoute
    ) {
    this.communes = geoApiService.communes;
    this.departementSelected = geoApiService.departementSelected;
  }

  /**
   * Retrieves the department code from the route parameters and triggers a search for associated communes
   * using the geoApiService.
   *
   * @return {void} This method does not return a value.
   */
  ngOnInit(): void {
    this.departementCode = this.route.snapshot.paramMap.get('codeDepartement')!;
    this.geoApiService.searchCommunes(this.departementCode);
  }

  /**
   * reset data related to communes.
   *
   * @return {void} No return value.
   */
  ngOnDestroy() {
    this.geoApiService.resetCommunes();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  /**
   * Retrieves a filtered list of communes based on the selected letter.
   * If no letter is selected or the selected letter is an empty string, all communes are returned.
   * Otherwise, it filters the communes whose names start with the selected letter (case-insensitive).
   *
   * @return {Array} A list of communes filtered by the selected letter, or the full list if no filter is applied.
   */
  get filteredCommunes() {
    if (!this.selectedLetter || this.selectedLetter === '') {
      return this.geoApiService.communes();
    }

    return this.geoApiService.communes().filter(dept =>
      dept.nom.toUpperCase().startsWith(<string>this.selectedLetter)
    );
  }

  selectLetter(letter: string) {
    this.selectedLetter = letter;
  }
}
