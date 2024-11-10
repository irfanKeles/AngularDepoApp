import { Component } from '@angular/core';
import { BlankComponent } from '../blank/blank.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BlankComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
