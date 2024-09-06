import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()

export class BannerService {

    constructor(private http: HttpClient) { }

    apiUrl: any = environment.apiUrl;
    finalApi:any = this.apiUrl;
    Api:any;


    extractData(res: any) {
        const body = res;
        return body || {};
    }



    addBanner(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/admin/banner`,request).pipe(map(this.extractData));
    }

    getBanner(request: any): Observable<any> {

      this.Api = (`${this.apiUrl}/admin/banner?page=` + request.page + '&limit=' + request.limit);

      if(request.status != "")
        this.Api += '&status='+request.status;

      if(request.userType != "")
        this.Api += '&userType='+request.userType;

      if(request.deviceType != "")
        this.Api += '&deviceType='+request.deviceType ;

      if(request.searchBy != "")
        this.Api += '&title='+request.searchBy;


      this.finalApi = this.http.get(this.Api).pipe(map(this.extractData));

      return this.finalApi;
    }

    getBannerDetails(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/admin/banner/` + request).pipe(map(this.extractData));
    }

    updateBanner(id: any, request: any ): Observable<any> {
        return this.http.patch(`${this.apiUrl}/admin/banner/` + id, request).pipe(map(this.extractData));
    }

    dltBanner(request: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}/admin/banner/` + request).pipe(map(this.extractData));
    }

    statusBanner(id: any, request: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/admin/banner/` + id, request).pipe(map(this.extractData));
    }

}
