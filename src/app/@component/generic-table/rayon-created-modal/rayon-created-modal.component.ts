import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TypeComponent } from '../../type/type.component';
import { SharedService } from '../../../@service/shared.service';
import { Warehouse, WarehouseRequest } from '../../../@model/warehouse';

@Component({
  selector: 'app-rayon-created-modal',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    TypeComponent,
    FormsModule
  ],
  templateUrl: './rayon-created-modal.component.html',
  styleUrl: './rayon-created-modal.component.scss',
})
export class RayonCreatedModalComponent {
  rayonForm: FormGroup;
  isDisabled: boolean = true;
  warehouseData: Warehouse[] = [];
  lastRayon?: string;
  typeName: string;
  wareHouseRequest: WarehouseRequest = new WarehouseRequest();
  warehouseType:string;
  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private dialogConfig: DynamicDialogConfig,
    private sharedService: SharedService
  ) { 
    
  }

  ngOnInit() {
    this.warehouseType =  this.sharedService.enumType(this.dialogConfig.data.warehouseType);
    this.getInventory();
    this.rayonForm = this.fb.group({
      rayon: [{ value: `${this.lastRayon}`, disabled: this.isDisabled }, Validators.required],
    });
  }

  async getInventory() {
    const warehouseType = this.dialogConfig.data.warehouseType;
    const getWarehouse = warehouseType === 1 ? this.sharedService.warehouseA$ : this.sharedService.warehouseB$;
    getWarehouse.subscribe(x => {
      this.warehouseData = x;
      this.updateLastRayon();
    });
  }

  private updateLastRayon() {
    this.lastRayon = this.warehouseData.at(-1)?.rayon;
    if (this.lastRayon) {
      const rayonNumber = parseInt(this.lastRayon.slice(1), 10);
      this.lastRayon = "R" + (rayonNumber + 1);
    }
  }

  closeDialog() {
    this.rayonForm.reset();
    this.ref.close();
  }

  getTypeName(event: any) {
    this.typeName = event;
  }

  onSubmit(form: FormGroup) {
    this.wareHouseRequest = form.value
    this.wareHouseRequest.type = this.typeName;
    this.wareHouseRequest.id = Math.floor(Math.random()*1000);
    this.createdRayon(this.wareHouseRequest)
  }
  createdRayon(request: Warehouse) {
    this.warehouseData.push(request);
    if (this.dialogConfig.data.warehouseType === 1) {
      this.sharedService.setWarehouseA(this.warehouseData); 
    } else {
      this.sharedService.setWarehouseB(this.warehouseData);
    }
    if (this.dialogConfig.data.warehouseType === 1) {
      this.sharedService.getWarehouseA().subscribe();
    } else {
      this.sharedService.getWarehouseB().subscribe();
    }
    this.closeDialog();
  }
  
}
