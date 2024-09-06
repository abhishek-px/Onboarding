import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()

export class BannerService {

  constructor(private http: HttpClient) { }

  apiUrl: any = environment.apiUrl;
  finalApi: any = this.apiUrl;
  Api: any;


  extractData(res: any) {
    const body = res;
    return body || {};
  }



  addBanner(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/customers/add-customer/`, request).pipe(map(this.extractData));
  }

  getBanner(): Observable<any> {
    this.Api = `${this.apiUrl}/admin/customers`;

    this.finalApi = this.http.get(this.Api).pipe(map(this.extractData));

    return this.finalApi;
  }

  getBannerDetails(request: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/customers/` + request).pipe(map(this.extractData));
  }

  updateBanner(id: any, request: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/admin/banner/` + id, request).pipe(map(this.extractData));
  }

}
