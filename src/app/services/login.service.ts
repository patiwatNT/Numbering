import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://10.0.53.192:9090/login';
  constructor(private http: HttpClient) {}
  login(data:any) {
    return this.http.post(`${this.apiUrl}/auth`, data);
  }
  signOut(data: any){
    return this.http.post(`${this.apiUrl}/signOut`, data);
  }

  sessionInfo(data: any){
    return this.http.post(`${this.apiUrl}/sessionInfo`, data);
  }

  extendSession(data: any){
    return this.http.post(`${this.apiUrl}/extendSession`, data);
  }

}
