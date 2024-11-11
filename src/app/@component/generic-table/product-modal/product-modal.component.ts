import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedService } from '../../../@service/shared.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TypeComponent } from '../../type/type.component';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    TypeComponent,
    FormsModule
  ],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent {
  productForm: FormGroup;
  typeName: string;
  buttonName: string;
  isUpdate: boolean = false;
  isDisabled: boolean = true;
  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private dialogConfig: DynamicDialogConfig,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    console.log('this.dialogConfig.data', this.dialogConfig.data);
    this.buttonName = this.dialogConfig.data.isUpdate ? "Düzenle" : "Ekle";
    this.isUpdate = this.dialogConfig.data.isUpdate

    this.productForm = this.fb.group({
      id: [{ value: `${this.dialogConfig.data.prodcut?.id ? this.dialogConfig.data.prodcut.id : ''}`, disabled: this.isUpdate ?? this.isDisabled }, Validators.required],
      name: [`${this.dialogConfig.data.prodcut?.name ? this.dialogConfig.data.prodcut.name : ''}`, Validators.required],
      rayon: [{ value: `${this.dialogConfig.data.rowData.rayon}`, disabled: this.isDisabled }, Validators.required],
    });
  }

  closeDialog() {
    this.productForm.reset();
    this.ref.close();
  }

  getTypeName(event: any) {
    this.typeName = event;
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    if(form.valid){
      if (!this.isUpdate)
        this.createdProduct();
      else
        this.updateProduct();
    }
   
  }
  createdProduct() {

  }
  updateProduct() {

  }
}
