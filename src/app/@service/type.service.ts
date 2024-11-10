import { Injectable } from '@angular/core';
import { GenericHttpService } from './generic-http.service';
import { Observable } from 'rxjs';
import { Type } from '../@model/type';

const Endpoints = {
  GetList: 'type.json'
}

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  constructor(
    private _http: GenericHttpService
  ) { }

  getList(): Observable<Type[]> {
    const fullPath = Endpoints.GetList;
    return this._http.get<Type[]>(fullPath);
  }
}