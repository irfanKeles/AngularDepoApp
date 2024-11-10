import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TypeComponent } from '../../type/type.component';

@Component({
  selector: 'app-rayon-created-modal',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    TypeComponent
  ],
  templateUrl: './rayon-created-modal.component.html',
  styleUrl: './rayon-created-modal.component.scss',
})
export class RayonCreatedModalComponent {
  constructor(
    public ref: DynamicDialogRef
  ){}


  closeDialog(){
    this.ref.close();
  }

  getTypeId(event: any) {
   console.log(event)
  }
}