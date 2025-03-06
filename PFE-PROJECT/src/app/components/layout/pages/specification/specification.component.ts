import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css']
})
export class SpecificationComponent implements OnInit{
  specificationForm: FormGroup=this.fb.group({
    bedrooms: ['', Validators.required],
    bathrooms: ['', Validators.required] ,
    parkingSpots: ['', Validators.required],
    size: ['', Validators.required],
    plotSize: ['', Validators.required],
  builtUpArea: ['', Validators.required]
    
  });
  bedroomOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: 'studio', label: 'Studio' }
  ];


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }
  selectBedroom(value: string): void {
    this.specificationForm.get('bedrooms')?.setValue(value);
  }
  onSubmit(): void {
    if (this.specificationForm.valid) {
      console.log('Form submitted:', this.specificationForm.value);
    }


}
bathroomOptions = [  
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' }
];
parkingOptions = [  
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5+', label: '5+' }
];
selectBathroom(value: string): void {  
  this.specificationForm.get('bathrooms')?.setValue(value);}

selectParking(value: string): void {  
  this.specificationForm.get('parkingSpots')?.setValue(value);
}
}
