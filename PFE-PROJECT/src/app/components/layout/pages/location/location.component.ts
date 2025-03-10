import { Component, AfterViewInit, OnInit, NgZone } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import * as L from "leaflet";
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
  ngOnInit(): void {}
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
      this.updateLocation(initialLatLng);
      this.locationform.patchValue({ city: "dubai" });
    }, 100);
  }
  onCityChange(): void { const selectedCity = this.locationform.get('city')?.value as keyof typeof this.cityCoordinates; if (selectedCity && this.cityCoordinates[selectedCity]) { const coords = this.cityCoordinates[selectedCity]; const latlng = L.latLng(coords[0], coords[1]); this.map?.setView(latlng, 12); this.updateLocation(latlng); } }
  private updateLocation(latlng: L.LatLng): void {
    this.latitude = latlng.lat.toFixed(6);
    this.longitude = latlng.lng.toFixed(6);
    this.locationform.patchValue({
      lat: this.latitude,
      long: this.longitude,
    });
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