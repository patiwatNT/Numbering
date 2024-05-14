import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  private _user: any;
  private token = new BehaviorSubject<string>(
    ''
  ) 
  private adminFlag = new BehaviorSubject<string>(
    ''
  )
  token$ = this.token.asObservable();
  adminFlag$ = this.adminFlag.asObservable();

  set Token(token:any){
    this.token.next(token);
  }

  set AdminFlag(adminFlag:any){
    this.adminFlag.next(adminFlag);
  }

  set User(user: any) {
    this._user = user;
  }

  get User() {
    return this._user;
  }
}
