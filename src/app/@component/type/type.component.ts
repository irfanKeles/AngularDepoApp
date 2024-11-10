import { Component, EventEmitter, Inject, Output, PLATFORM_ID } from '@angular/core';
import { Type } from '../../@model/type';
import { isPlatformBrowser } from '@angular/common';
import { NotificationService } from '../../@service/notification.service';
import { SharedService } from '../../@service/shared.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-type',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule
  ],
  templateUrl: './type.component.html',
  styleUrl: './type.component.scss'
})
export class TypeComponent {
  body: HTMLElement | undefined;
  selectedType: Type;
  typeList: Type[] = [];
  @Output() setTypeId = new EventEmitter<string>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private sharedService: SharedService,
    private notificationService: NotificationService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.body = document.body;
    }
  }
  ngOnInit() {
    this.getType();
  }
  getType() {
    this.sharedService.Type$.subscribe(x => {
      this.typeList = x;
      this.selectedType = this.typeList[0];
      this.setTypeId.emit(this.selectedType.name);
    },
      err => {
        this.notificationService.error(err.message);
      })
  }
  selectedValue(event: any) {
    this.setTypeId.emit(event.value.name)
  }
}
