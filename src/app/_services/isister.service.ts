import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

@Injectable({
  providedIn: 'root'
})
export class IsisterService {

  private api: string = appsettings.apiUrl+'api/';

  constructor(private http: HttpClient) { }

  getPets() {
    return this.http.get(this.api+'pets');
  }
}
