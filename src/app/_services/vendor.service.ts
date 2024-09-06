import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()

export class VendorService {

    constructor(private http: HttpClient) { }

    apiUrl: any = environment.apiUrl;

    extractData(res: any) {
        const body = res;
        return body || {};
    }

    // addVendor(request: any): Observable<any> {
    //     return this.http.post(`${this.apiUrl}/uservendor`,request).pipe(map(this.extractData));
    // }

    getCustomer(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/admin/auth/uservendor?page=` + request.page + '&&limit=' + request.limit  + '&&searchBy=' + request.searchBy + '&&userType=' + request.userType + '&&startDate=' + request.startDate  + '&&endDate=' + request.endDate + '&&status=' + request.status).pipe(map(this.extractData));
    }
    
    
    getCustomerDetails(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/admin/auth/uservendor/` + request).pipe(map(this.extractData));
    }

    updateCustomer(request: any, id: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/admin/auth/uservendor/` + id, request).pipe(map(this.extractData));
    }


    getVendor(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/admin/auth/uservendor?page=` + request.page + '&limit=' + request.limit  + '&searchBy=' + request.searchBy + '&userType=' + request.userType  + '&accountStatus=' + request.accountStatus  + '&startDate=' + request.startDate  + '&endDate=' + request.endDate + '&status=' + request.status).pipe(map(this.extractData));
    }
    
    getVendorDetails(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/admin/auth/uservendor/` + request).pipe(map(this.extractData));
    }

    dltVendor(request: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}/admin/auth/uservendor/` + request).pipe(map(this.extractData));
    }

    approveRejectVendor(id: any, data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/admin/auth/approveVendor/` + id, data).pipe(map(this.extractData));
    }


    updateVendor(request: any, id: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/admin/auth/uservendor/` + id, request).pipe(map(this.extractData));
    }

    statusSeller(id: any, request: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/admin/auth/uservendor/status/` + id, request).pipe(map(this.extractData));
    }
    
    addVendor(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/admin/auth/uservendor`,request).pipe(map(this.extractData));
    }

    getVendorWithoutPagination(): Observable<any> {
        return this.http.get(`${this.apiUrl}/admin/auth/uservendor/list/dropdown`).pipe(map(this.extractData));
    }

}
