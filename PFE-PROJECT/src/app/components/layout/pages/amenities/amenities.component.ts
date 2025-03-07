import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent implements OnInit {
  amenitiesForm!:FormGroup ;
  constructor(private fb: FormBuilder) { }
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
    { id: 'spa',          name: 'Spa' },
  ];
  nearbyAmenities = [
    { id: 'viewofwater', name: 'View of Water' },
    { id: 'viewoflandmark', name: 'View of Landmark' },
    { id: 'nearbyhospitals', name: 'Nearby Hospitals' },
    { id: 'nearbypublictransport', name: 'Nearby Public Transport' },
    { id: 'nearbyschools', name: 'Nearby Schools' },
    { id: 'nearbyshopping', name: 'Nearby Shopping' },
    
  ];

 

  ngOnInit(): void {
    // Initialize the form group with form controls for each amenity
    this.initForm();
    this.setDefaultSelectedActions();

  }
  
  initForm(): void {
    
    const formGroupConfig = {};
    
    // Add building amenities
    this.buildingAmenities.forEach(amenity => {
      (formGroupConfig as Record<string, boolean[]>)[amenity.id] = [false];
    });
    
    // Add service amenities
    this.serviceAmenities.forEach(amenity => {
      (formGroupConfig as Record<string, boolean[]>)[amenity.id] = [false];
    });
    
    // Add room amenities
    this.roomAmenities.forEach(amenity => {
      (formGroupConfig as Record<string, boolean[]>)[amenity.id] = [false];
    });
    // Add area amenities
    this.areaAmenities.forEach(amenity => {
      (formGroupConfig as Record<string, boolean[]>)[amenity.id] = [false];
    });
    this.wellnessAmenities.forEach(amenity => {
      (formGroupConfig as Record<string, boolean[]>)[amenity.id] = [false];
    });
    this.nearbyAmenities.forEach(amenity => {
      (formGroupConfig as Record<string, boolean[]>)[amenity.id] = [false];
    });
    
    this.amenitiesForm = this.fb.group(formGroupConfig);
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
    }
  }
  isSelected(amenityId: string, action: string): boolean {
    return this.selectedAction[amenityId] === action;
  }
  
  onSubmit(): void {
    if (this.amenitiesForm.valid) {
      console.log('Selected amenities:', this.amenitiesForm.value);
      // Here you would typically send the data to your backend service
    }
  }

  setDefaultSelectedActions(): void {
    [...this.buildingAmenities, ...this.serviceAmenities, ...this.roomAmenities, ...this.areaAmenities, ...this.wellnessAmenities, ...this.nearbyAmenities]
      .forEach(amenity => {
        this.selectedAction[amenity.id] = 'delete'; // Default selection is delete
      });
  }
  

  }

