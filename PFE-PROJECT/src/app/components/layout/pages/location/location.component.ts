import { Component, AfterViewInit, OnInit, NgZone } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import * as L from "leaflet";
import { Icon, icon } from 'leaflet';

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"],
})
export class LocationComponent implements AfterViewInit, OnInit {
  latitude: string = "";
  longitude: string = "";
  locationform: FormGroup;
  private map: L.Map | null = null;
  private marker: L.Marker | null = null;

  cities = {
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
    return Object.entries(this.cities).map(([key, value]) => ({
      value: key,
      label: value,
    }));
  }

  cityCoordinates = {
    dubai: [25.2048, 55.2708] as L.LatLngTuple,
    abudhabi: [24.4539, 54.3773] as L.LatLngTuple,
    sharjah: [25.3463, 55.4211] as L.LatLngTuple,
    ajman: [25.4055, 55.5136] as L.LatLngTuple,
    fujairah: [25.1288, 56.3264] as L.LatLngTuple,
    alin: [24.2075, 55.7447] as L.LatLngTuple,
    rak: [25.6741, 55.9804] as L.LatLngTuple,
    umm: [25.5653, 55.5533] as L.LatLngTuple,
  };

  constructor(private fb: FormBuilder, private ngZone: NgZone) {
    this.locationform = this.fb.group({
      city: [null],
      lat: [
        "",
        [Validators.required, Validators.pattern(/^-?\d{1,3}\.\d{1,6}$/)],
      ],
      long: [
        "",
        [Validators.required, Validators.pattern(/^-?\d{1,3}\.\d{1,6}$/)],
      ],
    });
  }

  ngOnInit(): void {
    // Fix Leaflet icons
    this.fixLeafletIcons();
  }

  private fixLeafletIcons(): void {
    // Fix the icon paths for Leaflet markers
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    Icon.Default.mergeOptions({
      iconRetinaUrl: iconDefault.options.iconRetinaUrl,
      iconUrl: iconDefault.options.iconUrl,
      shadowUrl: iconDefault.options.shadowUrl,
      iconSize: iconDefault.options.iconSize,
      iconAnchor: iconDefault.options.iconAnchor,
      popupAnchor: iconDefault.options.popupAnchor,
      tooltipAnchor: iconDefault.options.tooltipAnchor,
      shadowSize: iconDefault.options.shadowSize
    });
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    setTimeout(() => {
      const dubaiCenter: L.LatLngTuple = [25.2048, 55.2708];
      const zoomLevel = 12;
      this.map = L.map("map", {
        center: dubaiCenter,
        zoom: zoomLevel,
        minZoom: 6,
      });

      L.tileLayer(
        "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
      ).addTo(this.map);

      const southWest = L.latLng(22.6, 51.0);
      const northEast = L.latLng(26.5, 56.5);
      const bounds = L.latLngBounds(southWest, northEast);
      this.map.setMaxBounds(bounds);

      this.map.on("click", (e: L.LeafletMouseEvent) => {
        this.ngZone.run(() => {
          this.updateLocation(e.latlng);
        });
      });

      const initialCoords = this.cityCoordinates["dubai"];
      const initialLatLng = L.latLng(initialCoords[0], initialCoords[1]);
      this.placeMarker(initialLatLng);
      
      // Initialize the form with dubai
      this.locationform.patchValue({ 
        city: "dubai",
        lat: initialCoords[0].toFixed(6),
        long: initialCoords[1].toFixed(6)
      }, {emitEvent: false});
      
      this.latitude = initialCoords[0].toFixed(6);
      this.longitude = initialCoords[1].toFixed(6);
    }, 100);
  }

  onCityChange(): void {
    const selectedCity = this.locationform.get('city')?.value as keyof typeof this.cityCoordinates;
    if (selectedCity && this.cityCoordinates[selectedCity]) {
      const coords = this.cityCoordinates[selectedCity];
      const latlng = L.latLng(coords[0], coords[1]);
      this.map?.setView(latlng, 12);
      
      // Update location without resetting the city value
      this.updateLocationWithoutCityReset(latlng);
    }
  }

  private updateLocationWithoutCityReset(latlng: L.LatLng): void {
    this.latitude = latlng.lat.toFixed(6);
    this.longitude = latlng.lng.toFixed(6);
    
    // Only update lat and long, preserving the city selection
    this.locationform.patchValue({
      lat: this.latitude,
      long: this.longitude
    }, {emitEvent: false}); // Prevent additional form events
    
    this.placeMarker(latlng);
  }

  private updateLocation(latlng: L.LatLng): void {
    this.latitude = latlng.lat.toFixed(6);
    this.longitude = latlng.lng.toFixed(6);
    
    // Preserve the current city selection
    const currentCity = this.locationform.get('city')?.value;
    
    this.locationform.patchValue({
      lat: this.latitude,
      long: this.longitude,
      city: currentCity // Keep the selected city
    }, {emitEvent: false});
    
    this.placeMarker(latlng);
  }

  private placeMarker(latlng: L.LatLng): void {
    if (this.marker) {
      this.marker.setLatLng(latlng);
    } else {
      this.marker = L.marker(latlng).addTo(this.map!);
    }
  }

  onSubmit(): void {
    if (this.locationform.valid) {
      console.log("Form submitted:", this.locationform.value);
    } else {
      console.error("Form is invalid");
    }
  }
}