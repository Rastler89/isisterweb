import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { appsettings } from '../settings/appsettings';
import { Login } from '../interfaces/Login';
import { ResponseAccess } from '../interfaces/responseAccess';
import { addBodyClass } from '@angular/cdk/schematics';
import { Refresh } from '../interfaces/Refresh';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api: string = appsettings.apiUrl+'oauth/';
  private api2: string = appsettings.apiUrl+'api/';
  

  constructor(private http: HttpClient, private storage: StorageService, private router: Router) { }

  login(user:Login): Observable<ResponseAccess> {
    user.client_id = appsettings.clientId;
    user.client_secret = appsettings.clientSecret;
    user.grant_type = 'password';
    user.scope = '';
    return this.http.post<ResponseAccess>(this.api+'token', user, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(this.api+'logout', { }, httpOptions);
  }

  refresh(): Observable<ResponseAccess> {
    const refreshToken = localStorage.getItem('refresh_token') || '';
    var rf: Refresh = {
      client_id: appsettings.clientId,
      client_secret: appsettings.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    };

    return this.http.post<ResponseAccess>(this.api+'token', rf, httpOptions);
  }

  renew():void  {
    this.refresh().subscribe({
      next:(data) => {
        if(data.access_token) {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token',data.refresh_token);
        }
      },
      error:(error) => {
        this.storage.clean();
          this.router.navigate(['/login']);
          window.location.reload();
      }
    })
  }

  register(user:any,type:string): Observable<any> {
    user.type = type;
    return this.http.post(this.api2+'register', user, httpOptions);
  }

  changePassword(passwords:any): Observable<any> {
    return this.http.post(this.api+'changePassword',passwords,httpOptions);
  }
}
