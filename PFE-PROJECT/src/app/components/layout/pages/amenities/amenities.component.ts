import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormDataService } from '../../../services/form-data.service';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent implements OnInit {
  formKey: string = 'amenitiesFormData';
  amenitiesForm!: FormGroup;
  selectedAction: { [key: string]: string } = {};
  
  // Define the sections and amenities as in the image
  buildingAmenities = [
    { id: 'centralAC', name: 'Central A/C & Heating' },
    { id: 'parking', name: 'Parking' },
    { id: 'elevator', name: 'Elevator' },
    { id: 'petsAllowed', name: 'Pets Allowed' }
  ];

  serviceAmenities = [
    { id: 'conciergeService', name: 'Concierge Service' },
    { id: 'maidService', name: 'Maid Service' },
    { id: 'securityService', name: 'Security Service' },
    { id: 'lobbyInBuilding', name: 'Lobby in Building' }
  ];
  
  roomAmenities = [
    { id: 'maidsRoom', name: 'Maids Room' },
    { id: 'studyRoom', name: 'Study Room' },
    { id: 'balcony', name: 'Balcony' },
    { id: 'walkInCloset', name: 'Walk-In Closet' }
  ];
  
  areaAmenities = [
    { id: 'chilldrensplayarea', name: 'Children\'s Play Area' },
    { id: 'garden', name: 'Garden' },
    { id: 'barbaquearea', name: 'Barbaque Area' },
  ];
  
  wellnessAmenities = [
    { id: 'Jacuzzi', name: 'Jacuzzi' },
    { id: 'Sauna', name: 'Sauna' },
    { id: 'sharedgym', name: 'Shared Gym' },
    { id: 'privategym', name: 'Private Gym' },
    { id: 'sharedpool', name: 'Shared Pool' },
    { id: 'privatepool', name: 'Private Pool' },
    { id: 'spa', name: 'Spa' },
  ];
  
  nearbyAmenities = [
    { id: 'viewofwater', name: 'View of Water' },
    { id: 'viewoflandmark', name: 'View of Landmark' },
    { id: 'nearbyhospitals', name: 'Nearby Hospitals' },
    { id: 'nearbypublictransport', name: 'Nearby Public Transport' },
    { id: 'nearbyschools', name: 'Nearby Schools' },
    { id: 'nearbyshopping', name: 'Nearby Shopping' },
  ];

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService
  ) { }

  ngOnInit(): void {
    // Initialize the form group with form controls for each amenity
    this.initForm();
    
    // Load any saved data from localStorage
    const savedData = this.formDataService.getFormDataSnapshot(this.formKey);
    if (savedData && Object.keys(savedData).length > 0) {
      this.loadSavedData(savedData);
    } else {
      this.setDefaultSelectedActions();
    }
    
    // Subscribe to form value changes to save data automatically
    this.amenitiesForm.valueChanges.subscribe(values => {
      // Filter to only store true values
      const trueValuesOnly: { [key: string]: boolean } = {};
      Object.keys(values).forEach(key => {
        if (values[key] === true) {
          trueValuesOnly[key] = true;
        }
      });
      this.formDataService.updateFormData(trueValuesOnly, this.formKey);
    });
  }
  
  initForm(): void {
    const formGroupConfig = {};
    
    // Add all amenities to form group
    [
      ...this.buildingAmenities, 
      ...this.serviceAmenities, 
      ...this.roomAmenities,
      ...this.areaAmenities,
      ...this.wellnessAmenities,
      ...this.nearbyAmenities
    ].forEach(amenity => {
      (formGroupConfig as Record<string, boolean[]>)[amenity.id] = [false];
    });
    
    this.amenitiesForm = this.fb.group(formGroupConfig);
  }
  
  loadSavedData(savedData: any): void {
    // For each amenity, check if it exists in saved data
    Object.keys(this.amenitiesForm.controls).forEach(controlName => {
      if (savedData[controlName]) {
        this.amenitiesForm.get(controlName)?.setValue(true);
        this.selectedAction[controlName] = 'check';
      } else {
        this.selectedAction[controlName] = 'delete';
      }
    });
  }
  
  toggleAmenity(amenityId: string, action: string): void {
    const control = this.amenitiesForm.get(amenityId);

    if (control) {
      // Update the selected action
      if (action === 'check') {
        this.selectedAction[amenityId] = 'check';
        control.setValue(true); // Set the form control value to true
      } else if (action === 'delete') {
        this.selectedAction[amenityId] = 'delete';
        control.setValue(false); // Set the form control value to false
      }
      
      // No need for manual submit as valueChanges subscription handles the saving
    }
  }
  
  isSelected(amenityId: string, action: string): boolean {
    return this.selectedAction[amenityId] === action;
  }

  setDefaultSelectedActions(): void {
    [
      ...this.buildingAmenities, 
      ...this.serviceAmenities, 
      ...this.roomAmenities,
      ...this.areaAmenities,
      ...this.wellnessAmenities,
      ...this.nearbyAmenities
    ].forEach(amenity => {
      this.selectedAction[amenity.id] = 'delete'; // Default selection is delete
    });
  }
  onSubmit(): void {
    if (this.amenitiesForm.valid) {
      console.log('Selected amenities:', this.amenitiesForm.value);
      // Here you would typically send the data to your backend service
    }
}
}