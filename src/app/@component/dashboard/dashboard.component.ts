import { Component } from '@angular/core';
import { BlankComponent } from '../blank/blank.component';
import { Colum } from '../../@model/genericTable/table';
import { Warehouse } from '../../@model/warehouse';
import { WarehouseType } from '../../@model/enums/WarehouseTypeEnum';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import { WarehouseService } from '../../@service/warehouse.service';
import { SharedService } from '../../@service/shared.service';
import { NotificationService } from '../../@service/notification.service';
import { CategoryService } from '../../@service/category.service';
interface Column {
  field: string;
  header: string;
}

interface Product {
  code: number;
  name: string;
  category: string;
  quantity: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    BlankComponent,
    GenericTableComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  searchQuery: string = '';

  tableColum: Colum[] = [];

  warehouseListA: Warehouse[] = [];
  warehouseListB: Warehouse[] = [];

  filteredWarehouseListA: Warehouse[] = [];
  filteredWarehouseListB: Warehouse[] = [];

  warehouseTypeA: WarehouseType = WarehouseType.A;
  warehouseTypeB: WarehouseType = WarehouseType.B;

  constructor(
    private warehouseService: WarehouseService,
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private notificationService: NotificationService,
  ) {
    this.tableColum = [
      {
        field: 'rayon', header: 'Reyon',
      },
      {
        field: 'type', header: 'Tür',
      },
      {
        field: 'products', header: 'Ürünler',
      },
    ];

    this.setCategory();
    this.setWarehouseA();
    this.setWarehouseb();
  }

  ngOnInit() {
    this.sharedService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.search();  
    });
    this.getWarehosuTableDataA();
    this.getWarehosuTableDataB();
  }

  setCategory() {
    this.categoryService.getList().subscribe(x => {
      this.sharedService.setCategory(x);
    },
    err => {
      this.notificationService.error(err.message);
    })
  }
  setWarehouseA() {
    this.warehouseService.getAWarehouse().subscribe(x => {
      this.sharedService.setWarehouseA(x);
    },
    err => {
      this.notificationService.error(err.message);
    })
  }
  setWarehouseb() {
    this.warehouseService.getBWarehouse().subscribe(x => {
      this.sharedService.setWarehouseB(x);
    },
    err => {
      this.notificationService.error(err.message);
    })
  }

  getWarehosuTableDataA() {
    this.sharedService.warehouseA$.subscribe(x => {
      this.warehouseListA = x
      this.search();
    },
      err => {
        this.notificationService.error(err.message);
      })
  }

  getWarehosuTableDataB() {
    this.sharedService.warehouseB$.subscribe(x => {
      this.warehouseListB = x
      this.search();
    },
      err => {
        this.notificationService.error(err.message);
      })
  }

  search() {
    const query = this.searchQuery.toLowerCase();
    this.filteredWarehouseListA = this.warehouseListA.filter(item => 
      item.products?.some(product => product.name.toLowerCase().includes(query)) 
    );

    this.filteredWarehouseListB = this.warehouseListB.filter(item => 
      item.products?.some(product => product.name.toLowerCase().includes(query)) 
    );
  }
}
