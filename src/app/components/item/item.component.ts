import { Component } from '@angular/core';
import {MatCard, MatCardHeader, MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-item',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardModule
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {

}
