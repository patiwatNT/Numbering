import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhoneInfo } from '../models/phoneInfo';
import { BlockDetailDtoC } from '../models/blockDetailDtoC';


@Injectable({
    providedIn: 'root'
  })
  export class BackendService {

    private apiUrl = 'http://10.0.53.192:9090'; // Replace with your backend API URL
  
    constructor(private http: HttpClient) {}
  
    saveNews(data: undefined): Observable<any> {
      // Send data to backend using HTTP POST request
      return this.http.post(`${this.apiUrl}/news/saveNews`,  data ,{responseType: 'text'});
    }

    init(): Observable<any>{
      return this.http.get(`${this.apiUrl}/news/main`);
    }

    findNewsById(id: string): Observable<any>{
      return this.http.get(`${this.apiUrl}/news/findById/${id}`);
    }

    findPhoneInfoById(data: undefined): Observable<any>{
      return this.http.get<PhoneInfo>(`${this.apiUrl}/phone-info/findById/${data}`);
    }

    findAllBlock(): Observable<any>{
      return this.http.get(`${this.apiUrl}/block/findAll`);
    }

    findBlockDetail(data: BlockDetailDtoC): Observable<any>{
      return this.http.post(`${this.apiUrl}/block-detail/findBlockDetail`,data);
    }

    findByStatusGroup(statusGroup: String): Observable<any>{
      return this.http.get(`${this.apiUrl}/config-code/findByStatusGroup/${statusGroup}`);
    }

    findNumberingLocation(): Observable<any>{
      return this.http.get(`${this.apiUrl}/numbering-location/findAll`);
    }

    findAllAssigned(): Observable<any>{
      return this.http.get(`${this.apiUrl}/assigned/findAll`);
    }

    findAllDivision(): Observable<any>{
      return this.http.get(`${this.apiUrl}/division/findAll`)
    }

    findAssignedRange(data:any): Observable<any>{
      return this.http.post(`${this.apiUrl}/assigned-range/findByCriteria`,data)
    }
  }