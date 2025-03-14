import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { FormDataService } from '../../../services/form-data.service';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  formKey: string = 'generalFormData';
  chequesOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
  ];


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
    Completed: 'Completed',
  };

  brokers = {
    Broker1: 'Broker1',
    Broker2: 'Broker2',
    Broker3: 'Broker3',
  };

  workflow = {
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

  mandate = {
    Exclusive: 'Exclusive',
    Non_Exclusive: 'Non Exclusive',
    Standard: 'Standard',
  };

  get categoriesArray() {
    return Object.entries(this.categories).map(([key, value]) => ({ 
      value: key, 
      label: value,
      disabled: key === 'Commercial' || key === 'Residential'
    }));
  }

  get statusArray() {
    return Object.entries(this.status).map(([key, value]) => ({ value: key, label: value }));
  }

  get brokersArray() {
    return Object.entries(this.brokers).map(([key, value]) => ({ value: key, label: value }));
  }

  get workflowsArray() {
    return Object.entries(this.workflow).map(([key, value]) => ({ value: key, label: value }));
  }

  get frequencyArray() {
    return Object.entries(this.frequency).map(([key, value]) => ({ value: key, label: value }));
  }

  get mandateArray() {
    return Object.entries(this.mandate).map(([key, value]) => ({ value: key, label: value }));
  }

  generalForm: FormGroup;

  constructor(private fb: FormBuilder, private formDataService: FormDataService) {
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
  cheques: [''],
    });

    
  }
  onStatusSelected(option: string) {
  this.generalForm.patchValue({ status: option });
}

onCategorySelected(option: string) {
  this.generalForm.patchValue({ category: option });
}

onBrokerSelected(option: string) {
  this.generalForm.patchValue({ broker: option });
}

onWorkflowSelected(option: string) {
  this.generalForm.patchValue({ workflow: option });
}

onFrequencySelected(option: string) {
  this.generalForm.patchValue({ frequency: option });
}

onMandateSelected(option: string) {
  this.generalForm.patchValue({ mandate_type: option });
}


  ngOnInit(): void {  const savedData = this.formDataService.getFormDataSnapshot(this.formKey);
    if (savedData && Object.keys(savedData).length > 0) {
      this.generalForm.patchValue(savedData);
    }
  
    // Auto-save form changes
    this.generalForm.valueChanges.subscribe((value) => {
      this.formDataService.updateFormData(value, this.formKey);
    });  this.generalForm.get('deal_type')?.valueChanges.subscribe((value) => {
      if (value === 'rent') {
        this.generalForm.get('availabilityDate')?.setValidators(Validators.required);
        this.generalForm.get('frequency')?.setValidators(Validators.required);
      } else {
        this.generalForm.get('availabilityDate')?.clearValidators();
        this.generalForm.get('frequency')?.clearValidators();
      }
      this.generalForm.get('availabilityDate')?.updateValueAndValidity();
      this.generalForm.get('frequency')?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.generalForm.valid) {
      console.log('Form submitted:', this.generalForm.value);
    }
  }
  selectcheques(value: string): void {
    this.generalForm.get('cheques')?.setValue(value);
  }
}
