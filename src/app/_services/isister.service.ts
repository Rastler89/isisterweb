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
    return this.http.get(this.api+'pets', httpOptions);
  }

  getPet(id:string) {
    return this.http.get(this.api+'pets/'+id, httpOptions);
  }

  getSpecies() {
    return this.http.get(this.api+'species', httpOptions);
  }

  addPet(pet: Pet) {
    return this.http.post(this.api+'pets', pet, httpOptions);
  }

  addImage(id:string,image:string) {
    return this.http.post(this.api+'pets/'+id,
      {image: image},
      httpOptions);
  }

  updatePet(object:any,id:string) {
    return this.http.put(this.api+'pets/'+id,
      object,
      httpOptions);
  }

  getDiseases() {
    return this.http.get(this.api+'diseases', httpOptions);
  }

  getVaccines(id:string) {
    return this.http.get(this.api+'vaccines/'+id,httpOptions);
  }

  addVaccine(vaccine:any,id:string) {
    return this.http.post(this.api+'vaccines/'+id,vaccine,httpOptions);
  }

  getAllergies(id:string) {
    return this.http.get(this.api+'allergies/'+id,httpOptions);
  }

  addAllergy(allergy:any,id:string) {
    return this.http.post(this.api+'allergies/'+id,allergy,httpOptions);
  }

  getDiet(id:string) {
    return this.http.get(this.api+'diets/'+id,httpOptions);
  }

  addDiet(diet:any,id:string) {
    return this.http.post(this.api+'diets/'+id,diet,httpOptions);
  }

  getWalk(id:string) {
    return this.http.get(this.api+'walks/'+id,httpOptions);
  }

  addWalk(diet:any,id:string) {
    return this.http.post(this.api+'walks/'+id,diet,httpOptions);
  }
}
