import { Component } from '@angular/core';
import { Currency } from '../../@model/currency';
import { SharedService } from '../../@service/shared.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currenncy: Currency[] = [];
  searchQuery: string = '';
  constructor(
    private sharedService: SharedService,
  ) {}

  ngOnInit() {
    // this._http.get('https://v6.exchangerate-api.com/v6/03000b0ffef4008088e540a9/latest/USD').subscribe((x:any) => {
    //   this.currenncy = [
    //     { code: 'USD', rate: x.conversion_rates.USD },
    //     { code: 'EUR', rate: x.conversion_rates.EUR },
    //     { code: 'GBP', rate: x.conversion_rates.GBP }
    //   ];
    //   console.log(this.currenncy)
    // },
    //   err => {
    //     console.log(err);
    //   })
  }

  onSearchChange() {
    this.sharedService.setSearchQuery(this.searchQuery);  
  }
}
