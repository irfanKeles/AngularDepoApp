import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private messageService: MessageService,
  ) { }

  success(message: string="Başarılı işlem") {
    this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: message });
  }
  info(message: string) {
    this.messageService.add({ severity: 'info', summary: 'Bilgi', detail: message });
  }
  warn(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Dikka', detail: message });
  }
  error(message: string = "Bir sorun oluştu!") {
    this.messageService.add({ severity: 'error', summary: 'Hata', detail: message });
  }
  secondary(message: string) {
    this.messageService.add({ severity: 'secondary', summary: '', detail: message });
  }
}

