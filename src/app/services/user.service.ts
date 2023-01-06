import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../config/AppConfig';
import { AppUser } from '../models/AppUser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private contentHeaders = new HttpHeaders();
  private httpUrl: string = AppConfig.apiUrl;
  private userSubject: BehaviorSubject<AppUser | null>;
  public user: Observable<AppUser | null>;

  constructor(private http: HttpClient) { 
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!))
    this.user = this.userSubject.asObservable();
    this.contentHeaders.append('Accept', 'application/json')
    this.contentHeaders.append('Content-Type', 'application/json')
  }

  findByUsername = (userName: string) => {
    return this.http.get(`${this.httpUrl}/users?username=${userName}`)
  }

  register = (appUser: AppUser) => {
    console.log(appUser);
    return this.http.post(`${this.httpUrl}/users`, appUser);
  }

  login = (appUser: AppUser) => {
    console.log(appUser);
    return this.http.get(`${this.httpUrl}/users?username=${appUser.username}&password=${appUser.password}`)
  }
}
