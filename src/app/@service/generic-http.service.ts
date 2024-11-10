import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError as observableThrowError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {
  protected BASE_API_URL = environment.api_base_url;
  constructor(
    private _http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  public get<T>(url: string): Observable<any> {

    return this._http
      .get<any>(this.BASE_API_URL + url)
      .pipe(catchError(this.handleError));

  }
  
  public handleError(response: any) {
    const errorBody = response.error;
    return observableThrowError(errorBody);
  }
}
