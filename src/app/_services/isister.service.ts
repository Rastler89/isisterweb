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

  deleteDiet(id:string,day:any,hour:any) {
    return this.http.delete(this.api+'diets/'+id+'/'+day+'/'+hour,httpOptions);
  }

  getWalk(id:string) {
    return this.http.get(this.api+'walks/'+id,httpOptions);
  }

  addWalk(diet:any,id:string) {
    return this.http.post(this.api+'walks/'+id,diet,httpOptions);
  }

  deleteWalk(id:string,day:any,hour:any) {
    return this.http.delete(this.api+'walks/'+id+'/'+day+'/'+hour,httpOptions);
  }

  getSurgery(id:string) {
    return this.http.get(this.api+'surgeries/'+id,httpOptions);
  }

  getSurgeryTypes() {
    return this.http.get(this.api+'surgeryType',httpOptions);
  }

  addSurgery(surgery:any,id:string) {
    return this.http.post(this.api+'surgeries/'+id,surgery,httpOptions);
  }

  getTreatment(id:string) {
    return this.http.get(this.api+'treatments/'+id,httpOptions);
  }

  addTreatment(treatment:any,id:string) {
    return this.http.post(this.api+'treatments/'+id,treatment,httpOptions);
  }

  getVisit(id:string) {
    return this.http.get(this.api+'visits/'+id,httpOptions);
  }

  addVisit(visit:any,id:string) {
    return this.http.post(this.api+'visits/'+id,visit,httpOptions);
  }

  getMedicalTypes() {
    return this.http.get(this.api+'medicalType',httpOptions);
  }

  getMedical(id:string) {
    return this.http.get(this.api+'medicals/'+id,httpOptions);
  }

  addMedical(medical:any,id:string) {
    return this.http.post(this.api+'medicals/'+id,medical,httpOptions);
  }

  getCountries() {
    return this.http.get(this.api+'countries/full',httpOptions);
  }

  getProfile() {
    return this.http.get(this.api+'profile',httpOptions);
  }

  changeProfile(profile:any) {
    return this.http.post(this.api+'profile',httpOptions);
  }

  getPublicPet(hash:string) {
    return this.http.get(this.api+'public/pet/'+hash,httpOptions);
  }

}
