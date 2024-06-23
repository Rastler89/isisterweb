import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { appsettings } from '../settings/appsettings';
import { Login } from '../interfaces/Login';
import { ResponseAccess } from '../interfaces/responseAccess';
import { addBodyClass } from '@angular/cdk/schematics';
import { Refresh } from '../interfaces/Refresh';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api: string = appsettings.apiUrl+'oauth/';
  

  constructor(private http: HttpClient) { }

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
}
