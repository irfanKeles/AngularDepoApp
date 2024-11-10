import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { StyleClassModule } from 'primeng/styleclass';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastModule,
    RippleModule,
    StyleClassModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularDepoApp';
  constructor(private primengConfig: PrimeNGConfig) {}
  ngOnInit(){
    this.primengConfig.setTranslation({
      accept: 'Sil',
      reject: 'İptal',
    })
  }
}
