import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Colum } from '../../@model/genericTable/table';
import { WarehouseType } from '../../@model/enums/WarehouseTypeEnum';
import { Warehouse } from '../../@model/warehouse';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    CommonModule
  ],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss'
})
export class GenericTableComponent {
  @Input() cols: Colum[];
  @Input() tableData!: Warehouse[];
  @Input() warehouseType!: WarehouseType;
}
