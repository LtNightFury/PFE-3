import { Component , AfterViewInit, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements AfterViewInit , OnInit{
  latitude: string = '';
  longitude: string = '';
  
  ngOnInit(): void {}
  
  private marker: L.Marker | null = null;

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Coordinates for UAE
      const dubaiCenter: L.LatLngTuple = [25.2048, 55.2708]; // Dubai city center
      const zoomLevel = 12; // Zoomed in to city level detail// Good level to see the whole UAE
      
      const map = L.map('map', {
        center: dubaiCenter,
        zoom: zoomLevel,
        minZoom: 6 // Prevent zooming out too far
      });
       
      
      L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png', {
    }).addTo(map);
      
      // Optional: Set max bounds to restrict panning outside the UAE and nearby area
      const southWest = L.latLng(22.6, 51.0); // SW corner
      const northEast = L.latLng(26.5, 56.5); // NE corner
      const bounds = L.latLngBounds(southWest, northEast);
      map.setMaxBounds(bounds);
      
      map.on('click', (e: L.LeafletMouseEvent) => {
        this.latitude = e.latlng.lat.toFixed(6);
        this.longitude = e.latlng.lng.toFixed(6);
        this.locationform.patchValue({
          lat: this.latitude,
          long: this.longitude
          
        });
        
        if (this.marker) {
          this.marker.setLatLng(e.latlng);
        } else {
          this.marker = L.marker(e.latlng).addTo(map);
        }
      });
      
    }, 100);
  }
  locationform: FormGroup;
  
  constructor(private fb: FormBuilder) {  
    this.locationform = this.fb.group({
      lat: new FormControl(this.latitude, [Validators.required]),
      long: new FormControl(this.longitude, [Validators.required]),
      city:['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.locationform.valid) {
      console.log('Form submitted:', this.locationform.value);
    }
  }
  city={
    dubai: 'Dubai',
    abudhabi: 'Abu Dhabi',
    sharjah: 'Sharjah',
    ajman: 'Ajman',
    fujairah: 'Fujairah',
    alin: 'Al Ain',
    rak: 'Ras Al Khaimah',
    umm: 'Umm Al Quwain'
    

  }
  get cityOptions() {
    return Object.entries(this.city).map(([key, value]) => ({ value: key, label: value }));
  }
}




