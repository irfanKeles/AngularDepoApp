import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Colum } from '../../@model/genericTable/table';
import { WarehouseType } from '../../@model/enums/WarehouseTypeEnum';
import { Warehouse } from '../../@model/warehouse';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../@service/notification.service';
import { SharedService } from '../../@service/shared.service';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { RayonCreatedModalComponent } from './rayon-created-modal/rayon-created-modal.component';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    ConfirmPopupModule
  ],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss',
  providers: [DialogService, ConfirmationService]
})
export class GenericTableComponent {
  @Input() cols: Colum[];
  @Input() tableData!: Warehouse[];
  @Input() warehouseType!: WarehouseType;
  warehouseData: Warehouse[] = [];
  public ref: DynamicDialogRef;
  constructor(
    public dialogService: DialogService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private notificationService: NotificationService,
    
  ) {

  }
  ngOnInit() {
    this.getInventory();
  }

  getInventory() {
    const warehouseType = this.warehouseType;
    const getWarehouse = warehouseType === 1 ? this.sharedService.warehouseA$ : this.sharedService.warehouseB$;
    getWarehouse.subscribe(x => {
      this.warehouseData = x;
    });
  }

  showReyonDialog() {
    this.ref = this.dialogService.open(RayonCreatedModalComponent, {
      modal: true,
      header: 'Reyon Ekle',
      data: {
        warehouseType: this.warehouseType
      },
      footer: ""
    });
  }
  deleteRayon(rowData: Warehouse, event: Event) {
    const index = this.warehouseData.findIndex(item => item.id === rowData.id);
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `${rowData.rayon} Silmek Üzeresiniz ?`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        if (index !== -1) {
          this.warehouseData.splice(index, 1);
          if (this.warehouseType === 1) {
            this.sharedService.setWarehouseA(this.warehouseData);
          } else {
            this.sharedService.setWarehouseB(this.warehouseData);
          }
        }
        this.notificationService.success(`${this.sharedService.enumType(this.warehouseType)} - ${rowData.rayon} Reyonu Silindi.`);
      },
      reject: () => {
      }
    });

  }
}
