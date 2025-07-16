import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {GeoApiService} from '../../services/geo-api.service';
import {MatList, MatListItem} from '@angular/material/list';

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
  communes;
  departementSelected;

  constructor(
    private router: Router,
    private geoApiService: GeoApiService,
    private route: ActivatedRoute
    ) {
    this.communes = geoApiService.communes;
    this.departementSelected = geoApiService.departementSelected;
  }

  ngOnInit(): void {
    this.departementCode = this.route.snapshot.paramMap.get('codeDepartement')!;
    this.geoApiService.searchCommunes(this.departementCode);
  }

  ngOnDestroy() {
    this.geoApiService.resetCommunes();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  selectedLetter: string | null = null;

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
