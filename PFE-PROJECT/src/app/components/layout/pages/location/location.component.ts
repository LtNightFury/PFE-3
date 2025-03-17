import { Component, AfterViewInit, OnInit, NgZone, ChangeDetectorRef, NgModule, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { FormDataService } from '../../../services/form-data.service';



@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class LocationComponent implements AfterViewInit   {
  formKey: string = 'locationFormData';
  
  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private formDataService: FormDataService) {}
  

  latitude: number = 0;
  longitude: number = 0;
  
 
    locationform: FormGroup = this.fb.group({
      latitude: ["", Validators.required],
      longitude: ["", Validators.required],
      city: [""],
    
   
   
  });
  oncityselected(option: string) {
    this.locationform.patchValue({ city: option });
    this.cdr.detectChanges();
  }
 

  city= {
    dubai: "Dubai",
    abudhabi: "Abu Dhabi",
    sharjah: "Sharjah",
    ajman: "Ajman",
    fujairah: "Fujairah",
    alin: "Al Ain",
    rak: "Ras Al Khaimah",
    umm: "Umm Al Quwain",
  };

  get cityOptions() {
    return Object.entries(this.city).map(([key, value]) => ({
      value: key,
      label: value,
    }));
  }
  selectedOption: string = '';
  ngAfterViewInit() {
    // Your existing logic...

    // Force change detection
    this.cdr.detectChanges();
  }

 

  onSubmit(): void {
    if (this.locationform.valid) {
      console.log("Form submitted:", this.locationform.value);
     
      
    } else {
      console.error("Form is invalid");
    }
  }
  selectedPosition: [number, number] | null = null;
  onPositionSelected(coordinates: [number, number]) {
    
    this.selectedPosition = coordinates;
    this.locationform.patchValue({
      latitude: coordinates[0],
      longitude: coordinates[1],
    });
  
    
  }
  ngOnInit(): void {
    
    const savedData = this.formDataService.getFormDataSnapshot(this.formKey);
    if (savedData && Object.keys(savedData).length > 0) {
      this.locationform.patchValue(savedData);
    }
    if (savedData.latitude && savedData.longitude) {
      this.latitude = savedData.latitude;
      this.longitude = savedData.longitude;
      this.selectedPosition = [savedData.longitude, savedData.latitude];
    }
  
    
    this.locationform.valueChanges.subscribe((value) => {
      this.formDataService.updateFormData(value, this.formKey);
    });
    
  }

  
  }

 
  


