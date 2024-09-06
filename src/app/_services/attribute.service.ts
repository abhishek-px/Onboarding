import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()

export class AttributeService {

    constructor(private http: HttpClient) { }

    apiUrl: any = environment.apiUrl;

    extractData(res: any) {
        const body = res;
        return body || {};
    }

    

    addAttribute(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/attribute`,request).pipe(map(this.extractData));
    }


    getAttribute(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/attribute?page=` + request.page + '&&limit=' + request.limit  + '&&searchBy=' + request.searchBy + '&&status=' + request.status).pipe(map(this.extractData));
    }
    
    getAttributeDetails(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/attribute/` + request).pipe(map(this.extractData));
    }

    updateAttribute(request: any, id: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/attribute/` + id, request).pipe(map(this.extractData));
    } 

    dltAttribute(request: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}/attribute/` + request).pipe(map(this.extractData));
    }

    statusAttribute(id: any, request: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/attribute/` + id, request).pipe(map(this.extractData));
    }
    getAttributeWithoutPagination(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/attribute/list/dropdown`).pipe(map(this.extractData));
    }

    
}
