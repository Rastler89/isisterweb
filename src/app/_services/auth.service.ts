import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appsettings } from '../settings/appsettings';
import { Login } from '../interfaces/Login';
import { ResponseAccess } from '../interfaces/responseAccess';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api: string = appsettings.apiUrl;

  constructor(private http: HttpClient) { }

  login(user:Login): Observable<ResponseAccess> {
    return this.http.post<ResponseAccess>(this.api+'login', user, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(this.api+'logout', { }, httpOptions);
  }
}
