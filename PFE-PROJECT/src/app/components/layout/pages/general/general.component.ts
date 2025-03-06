import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

 
  

  //lena 3amlthom en tant que key: value more ez mba3ed fel back 
  categories = {
    
    Residential: 'Residential',
    Appartment: 'Appartment',
    Duplex: 'Duplex',
    Hotel_Appartment: 'Hotel Appartment',
    PentHouse: 'PentHouse',
    TownHouse: 'TownHouse',
    Villa: 'Villa',
    Residental_Land: 'Residental Land',
    Commercial: 'Commercial',
    Factory: 'Factory',
    Office: 'Office',
    Shop: 'Shop',
    Warehouse: 'Warehouse',
    Commercial_Land: 'Commercial Land',

  };

   status = {
    Draft: 'Draft',
    Active: 'Active',
    PreBooking: 'Pre booking',
    Reserved: 'Reserved',
    Completed: 'Completed'
  };


  brokers = {
    Broker1: 'Broker1',
    Broker2: 'Broker2',
    Broker3: 'Broker3',
  };
  
  workflows = {
    Sale: 'Sale',
    Prospection: 'Prospection',
    Rent: 'Rent',
  };
  frequency = {
    Daily: 'Daily',
    Weekly: 'Weekly',
    Monthly: 'Monthly',
    Yearly: 'Yearly',
  };

  mandate= {
    Exclusive: 'Exclusive',
    Non_Exclusive: 'Non Exclusive',
    Standard: 'Standard',
  };


  

  
  
  get categoriesArray() {
    return Object.entries(this.categories).map(([key, value]) => ({ value: key, label: value }));
  }
  
  get statusArray() {
    return Object.entries(this.status).map(([key, value]) => ({ value: key, label: value }));
  }

  get brokersArray() {
    return Object.entries(this.brokers).map(([key, value]) => ({ value: key, label: value }));
  }
  get workflowsArray() {
    return Object.entries(this.workflows).map(([key, value]) => ({ value: key, label: value }));
  }
  get frequencyArray() {
    return Object.entries(this.frequency).map(([key, value]) => ({ value: key, label: value }));
  }
  
  get mandateArray() {
    return Object.entries(this.mandate).map(([key, value]) => ({ value: key, label: value }));
  }
  


  generalForm: FormGroup;
  constructor(private fb: FormBuilder) {  

  this.generalForm = this.fb.group({
      deal_type: ['sale'],
      Reference: ['', [Validators.required]],
      status: ['', [Validators.required]],
      category: ['', [Validators.required]],
      broker: ['', [Validators.required]],
      workflow: ['', [Validators.required]],
      availabilityDate: [''],
      frequency: [''],
      offMarket: ['YES', Validators.required],
      mandate_type: ['', [Validators.required]],
      mdstart: ['', [Validators.required]],
      mdend: ['', [Validators.required]],
      mdsrenewal: ['', [Validators.required]],
      RERA: ['', [Validators.required]],
      DTCM: ['', [Validators.required]],
  
    });
  

    this.generalForm.get('deal_type')?.valueChanges.subscribe(value => {

      if (value === 'rent') {
        this.generalForm.get('availabilityDate')?.setValidators(Validators.required);
        this.generalForm.get('frequency')?.setValidators(Validators.required);
      } else {
        this.generalForm.get('availabilityDate')?.clearValidators();
        this.generalForm.get('frequency')?.clearValidators();
      }
      
      // Important: Update the validation status
      this.generalForm.get('availabilityDate')?.updateValueAndValidity();
      this.generalForm.get('frequency')?.updateValueAndValidity();
    });
  
  }

  
  



    
    ngOnInit(): void {
   
    }
    onSubmit(): void {
      if (this.generalForm.valid) {
        console.log('Form submitted:', this.generalForm.value);
      }
    }
 


    //box selection
    selectedBox: HTMLElement | null = null;

}
