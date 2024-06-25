import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  public isLoggedIn(): boolean {
    const user = localStorage.getItem('access_token');
    if(user) {
      return true;
    } else {
      return false;
    }
  }
}
