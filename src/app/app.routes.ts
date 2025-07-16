import { Routes } from '@angular/router';
import {ListCommunesComponent} from './components/list-communes/list-communes.component';
import {SearchFormComponent} from './components/search-form/search-form.component';

export const routes: Routes = [
  { path: '', component: SearchFormComponent },
  { path: 'communes/:codeDepartement', component: ListCommunesComponent }
];
