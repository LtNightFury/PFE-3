import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormDataService } from '../../../services/form-data.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  formKey: string = 'priceFormData';
  priceForm: FormGroup = this.fb.group({
    price: ['', Validators.required],
    pricesqft: ['', Validators.required],
    originalprice: ['', Validators.required],
    hideprice: [false, ], 
    charges: ['' ], 
    servicecharge: ['' ], 
  });
  
  constructor(private fb: FormBuilder,
    private formDataService: FormDataService
  ) { }
  
  ngOnInit(): void {
    const savedData = this.formDataService.getFormDataSnapshot(this.formKey);
    if (savedData && Object.keys(savedData).length > 0) {
      this.priceForm.patchValue(savedData);
    }
  
    // Auto-save form changes
    this.priceForm.valueChanges.subscribe((value) => {
      this.formDataService.updateFormData(value, this.formKey);
    });
  }
  
  onSubmit(): void {
    if (this.priceForm.valid) {
      console.log('Form submitted:', this.priceForm.value);
    } 
  }
}