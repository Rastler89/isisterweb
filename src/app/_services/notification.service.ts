import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private alert$ = new Subject<{message: string, type: string}>();

  setAlert(message: string, type: string): void {
    this.alert$.next({message,type});
  }

  getAlert(): Observable<{message: string, type: string}> {
    return this.alert$.asObservable();
  }

  constructor() { }
}
