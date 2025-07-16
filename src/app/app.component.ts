import { Component } from '@angular/core';
import {SearchFormComponent} from './components/search-form/search-form.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-technical-test-geo-api';
}
