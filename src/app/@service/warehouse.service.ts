import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Warehouse } from '../@model/warehouse';
import { GenericHttpService } from './generic-http.service';

const Endpoints = {
  GetAWarehouse: 'warehouseA.json',
  GetBWarehouse: 'warehouseB.json'
}

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  constructor(
    private _http: GenericHttpService
  ) { }

  getAWarehouse(): Observable<Warehouse[]> {
    const fullPath = Endpoints.GetAWarehouse;
    return this._http.get<Warehouse[]>(fullPath);
  }
  getBWarehouse(): Observable<Warehouse[]> {
    const fullPath = Endpoints.GetBWarehouse;
    return this._http.get<Warehouse[]>(fullPath);
  }
}
