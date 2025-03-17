import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private formDataSubject = new BehaviorSubject<any>(this.loadFromLocalStorage());
  formData$ = this.formDataSubject.asObservable();

  updateFormData(data: any, formKey: string) {
    const currentData = this.loadFromLocalStorage();
    currentData[formKey] = data; // Save data under the specific form key
    localStorage.setItem('formData', JSON.stringify(currentData)); // Store updated data in localStorage
    this.formDataSubject.next(currentData);
  }

  getFormDataSnapshot(formKey: string) {
    const data = this.loadFromLocalStorage();
    return data[formKey] || {}; // Return the form data for the specific form key
  }

  private loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('formData') || '{}'); // Load all form data stored in localStorage
  }
  submitFormData() {
    console.log('Submitted Form Data:', this.loadFromLocalStorage());
  }
  
}