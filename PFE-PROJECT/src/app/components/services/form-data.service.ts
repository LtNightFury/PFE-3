import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private formDataSubject = new BehaviorSubject<any>(this.loadFromLocalStorage());
  formData$ = this.formDataSubject.asObservable();

  updateFormData(data: any) {
    this.formDataSubject.next(data);
    localStorage.setItem('generalFormData', JSON.stringify(data)); // Persist in localStorage
  }

  getFormDataSnapshot() {
    return this.formDataSubject.getValue();
  }

  private loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('generalFormData') || '{}');
  }
}

