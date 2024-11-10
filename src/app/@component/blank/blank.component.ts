import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [CardModule],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {
  @Input() cardTitle:string = "Default Card Title"

}
