import {
  Component,
  AfterViewInit,
  OnInit,
  NgZone,
  ChangeDetectorRef,
  NgModule,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { FormDataService } from '../../../services/form-data.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent implements AfterViewInit {
  formKey: string = 'locationFormData';

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private formDataService: FormDataService
  ) {}

  latitude: number = 0;
  longitude: number = 0;

  locationform: FormGroup = this.fb.group({
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    community: ['', Validators.required],
  });
  oncityselected(option: string) {
    this.locationform.patchValue({ city: option });
    this.cdr.detectChanges();
  }
  country = {
    uae: 'United Arab Emirates',
  };
  get countryoption() {
    return Object.entries(this.country).map(([key, value]) => ({
      value: key,
      label: value,
    }));
  }
  oncountryselected(option: string) {
    this.locationform.patchValue({ country: option });
    this.cdr.detectChanges();
  }
  oncommunityselected(option: string) {
    this.locationform.patchValue({ community: option });
    this.cdr.detectChanges();
  }

  city = {
    dubai: 'Dubai',
    abudhabi: 'Abu Dhabi',
    sharjah: 'Sharjah',
    ajman: 'Ajman',
    fujairah: 'Fujairah',
    alin: 'Al Ain',
    rak: 'Ras Al Khaimah',
    umm: 'Umm Al Quwain',
  };
  community = {
    dubai: [
      'Bluewaters',
      'Dubai Studio City',
      'Mudon',
      'Al Quoz',
      'Dubai Residence Complex',
      'Al Twar',
      'Dubai Science Park',
      'Dubai Festival City',
      'Expo City',
      'The Sustainable City',
      'Emirates Hills',
      'Jumeirah Park',
      'Al Garhoud',
      'Maritime City',
      'Meadows',
      'DuBiotech',
      "Al Warqa'a",
      'Green Community',
      'Damac Lagoons',
      'Mirdif',
      'Reem',
      'Academic City',
      'City Walk',
      'The Hills',
      'Dubai Lifestyle City',
      'Tilal Al Ghaf',
      'Nadd Al Hammar',
      'The World Islands',
      'Living Legends',
      'Wadi Al Safa 3',
      'World Trade Center',
      'Forbidden City',
      'Al Badaa',
      'Jumeirah Heights',
      'Al Rashidiya',
      'City of Arabia',
      'Dragon City',
      'The Oasis by Emaar',
      'Umm Hurair',
      'Dubai Internet City',
      'Nadd Al Sheba',
      'Rukan',
      'Arabian Ranches 2',
      'Dubai Promenade',
      'Al Safa',
      'Al Aweer',
      'Dubai Pearl',
      'Golf City',
      'Arabian Ranches 3',
      'Bawadi',
      'Dubai Design District',
      'Dubai Airport Freezone (DAFZA)',
      'Serena',
      'Al Khawaneej',
      'The Villa',
      'Dubai Outsource Zone',
      'Eye Park',
      'Al Lisaili',
      'Al Mina',
      'Wadi Al Safa 2',
      'The Gardens',
      'Emirates Golf Club',
      'Emirates Hills 2',
    ],
    abudhabi: [
      'Al Reem Island',
      'Saadiyat Island',
      'Al Khalidiya',
      'Corniche Road',
      'Tourist Club Area',
      'Muroor Area',
      'Al Maryah',
      'Al Aman',
      'City Downtown',
      'Al Raha Beach',
      'Hamdan Street',
      'Al Nahyan Camp',
      'Khalifa City',
      'Mohamed Bin Zayed City',
      'Yas Island',
      'Zayed Military City',
      'Airport Road',
      'The Marina',
      'Al Shamkha',
      'Mussafah',
      'Al Raha Gardens',
      'Al Jubail Island',
      'Eastern Road',
      'Al Reef',
      'Al Dhafrah',
      'Al Mushrif',
      'Al Ghadeer',
      'Jawazat Street',
      'Al Shahama',
      'Masdar City',
      'Hydra Village',
      'Rawdhat Abu Dhabi',
      'Khalifa Street',
      'Danet Abu Dhabi',
      'Al Bateen',
      'Al Salam Street',
      'Al Maqtaa',
      'Al Zahiyah',
      'Madinat Zayed',
      'Ghantoot',
      'Electra Street',
      'Al Danah',
      'Al Najda Street',
      'Al Fahid',
      'Between Two Bridges',
      'Al Raha Golf Gardens',
      'Al Nahyan',
      'Al Markaziyah',
      'Abu Dhabi Gate City',
      'Al Manaseer',
      'Al Wathba',
      'Al Manhal',
      'Al Hudayriat Island',
      'Building Materials City',
      'Grand Mosque District',
      'Al Qurm',
      'Al Silaa',
      'Hameem',
      'Al Wahda',
      'Al Karamah',
      'Baniyas',
      'Al Maryah Island',
      'Al Mina',
      'Al Rawdah',
      'Nurai Island',
      'Capital Centre',
      'Sas Al Nakheel',
      'Al Gurm',
      'Ramhan Island',
      'Marina Village',
      'Al Tibbiya',
      'Al Shawamekh',
      'Al Zaab',
      'Defense Road',
      'Al Samha',
      'Rabdan',
      'Zayed Sports City',
      'Al Rayhan',
    ],
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
      console.log('Form submitted:', this.locationform.value);
    } else {
      console.error('Form is invalid');
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
  get communityOptions(): { value: string; label: string; disabled?: boolean }[] {
    const cityValue = this.locationform.get('city')?.value;
    
    if (cityValue && cityValue in this.community) {
      const communities = this.community[cityValue as keyof typeof this.community];
      return communities.map(community => ({
        value: community,
        label: community
      }));
    }
    
    return [];
  }
  
  // Add a helper method to check if the dropdown should be disabled
  get isCommunityDropdownDisabled(): boolean {
    return this.communityOptions.length === 0;
  }
}
