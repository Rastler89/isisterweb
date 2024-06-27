import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Pet } from '../interfaces/Pet';

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

  getSpecies() {
    return this.http.get(this.api+'species');
  }

  addPet(pet: Pet) {
    return this.http.post(this.api+'pets', pet);
  }
}
