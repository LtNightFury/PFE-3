import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  priceForm: FormGroup = this.fb.group({
    price: ['', Validators.required],
    pricesqft: ['', Validators.required],
    originalprice: ['', Validators.required],
    hideprice: [false, ], 
    charges: ['' ], 
    servicecharge: ['' ], 
  });
  
  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void {
  }
  
  onSubmit(): void {
    if (this.priceForm.valid) {
      console.log('Form submitted:', this.priceForm.value);
    } 
  }
}