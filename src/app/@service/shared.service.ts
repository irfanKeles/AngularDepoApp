import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Type } from '../@model/type';
import { WarehouseType } from '../@model/enums/WarehouseTypeEnum';
import { CustomLocalStorageKey } from '../@model/storageKeys/keys';
import { Warehouse } from '../@model/warehouse';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public searchQuery$ = new ReplaySubject<string>();
  public warehouseA$ = new ReplaySubject<any>();
  public warehouseB$ = new ReplaySubject<any>();
  public Type$ = new ReplaySubject<any>();
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  setWarehouseA(data: Warehouse[]) {
    this.warehouseA$.next(data)
    if (isPlatformBrowser(this.platformId))
      localStorage.setItem(CustomLocalStorageKey.InventoryA, JSON.stringify(data))
  }
  setWarehouseB(data: Warehouse[]) {
    this.warehouseB$.next(data)
    if (isPlatformBrowser(this.platformId))
      localStorage.setItem(CustomLocalStorageKey.InventoryB, JSON.stringify(data))
  }
  setType(data: Type[]) {
    this.Type$.next(data)
    if (isPlatformBrowser(this.platformId))
      localStorage.setItem(CustomLocalStorageKey.Type, JSON.stringify(data))
  }

  getWarehouseA(): Observable<Warehouse[]> {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(CustomLocalStorageKey.InventoryA);
      return of(data ? JSON.parse(data) : []);
    }
    return of([]);
  }

  getWarehouseB(): Observable<Warehouse[]> {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(CustomLocalStorageKey.InventoryB);
      return of(data ? JSON.parse(data) : []);
    }
    return of([]);
  }

  getType(): Observable<Type[]> {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(CustomLocalStorageKey.Type);
      return of(data ? JSON.parse(data) : []);
    }
    return of([]);
  }

  setSearchQuery(query: string) {
    this.searchQuery$.next(query);
  }

  enumType(data: WarehouseType): string {
    let item: string = "";
    switch (data) {
      case 1:
        item = 'Depo A';
        break;
      case 2:
        item = 'Depo B';
        break;
    }
    return item;
  }
}
