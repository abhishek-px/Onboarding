import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  constructor(private http: HttpClient) {}
  apiUrl: any = environment.apiUrl;



  getDashBoardData(request: any): Observable<any> {

    let url = `${this.apiUrl}/admin/dashboard`;


    return this.http.get(url);
  }


}
