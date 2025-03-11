import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent {
  @ViewChild('photoFileInput') photoFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('floorFileInput') floorFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('docFileInput') docFileInput!: ElementRef<HTMLInputElement>;
  
  // storage mta3 el media 
  imagePreviews: string[] = [];
  floorPreviews: string[] = [];
  documentPreviews: string[] = [];
  videos: { title: string, url: string, description: string }[] = [];
  virtualTours: { title: string, url: string, description: string }[] = [];

  // UI state tracking
  isPhotoDragOver: boolean = false;
  isFloorDragOver: boolean = false;
  isDocDragOver: boolean = false;
  showPhotoError: boolean = false;
  showFloorError: boolean = false;
  showDocError: boolean = false;

  // Photo section handlers
  triggerPhotoFileInput() {
    this.photoFileInput.nativeElement.click();
  }

  onPhotoFileSelect(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) this.processPhotoFiles(files);
  }

  onPhotoDragOver(event: DragEvent) {
    event.preventDefault();
    this.isPhotoDragOver = true;
  }

  onPhotoDragLeave() {
    this.isPhotoDragOver = false;
  }

  onPhotoDrop(event: DragEvent) {
    event.preventDefault();
    this.isPhotoDragOver = false;
    if (event.dataTransfer?.files) {
      this.processPhotoFiles(event.dataTransfer.files);
    }
  }

  processPhotoFiles(files: FileList) {
    Array.from(files).forEach((file) => {
      if (this.isValidFile(file)) {
        const reader = new FileReader();
        reader.onload = (e) => this.imagePreviews.push(e.target?.result as string);
        reader.readAsDataURL(file);
      }
    });

    this.showPhotoError = this.imagePreviews.length === 0;
  }

  removePhoto(index: number) {
    this.imagePreviews.splice(index, 1);
    this.showPhotoError = this.imagePreviews.length === 0;
  }

  // Floor plan section handlers
  triggerFloorFileInput() {
    this.floorFileInput.nativeElement.click();
  }

  onFloorFileSelect(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) this.processFloorFiles(files);
  }

  onFloorDragOver(event: DragEvent) {
    event.preventDefault();
    this.isFloorDragOver = true;
  }

  onFloorDragLeave() {
    this.isFloorDragOver = false;
  }

  onFloorDrop(event: DragEvent) {
    event.preventDefault();
    this.isFloorDragOver = false;
    if (event.dataTransfer?.files) {
      this.processFloorFiles(event.dataTransfer.files);
    }
  }

  processFloorFiles(files: FileList) {
    Array.from(files).forEach((file) => {
      if (this.isValidFile(file)) {
        const reader = new FileReader();
        reader.onload = (e) => this.floorPreviews.push(e.target?.result as string);
        reader.readAsDataURL(file);
      }
    });

    this.showFloorError = this.floorPreviews.length === 0;
  }

  removeFloorPlan(index: number) {
    this.floorPreviews.splice(index, 1);
    this.showFloorError = this.floorPreviews.length === 0;
  }

  // Document section handlers
  triggerDocFileInput() {
    this.docFileInput.nativeElement.click();
  }

  onDocFileSelect(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) this.processDocFiles(files);
  }

  onDocDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDocDragOver = true;
  }

  onDocDragLeave() {
    this.isDocDragOver = false;
  }

  onDocDrop(event: DragEvent) {
    event.preventDefault();
    this.isDocDragOver = false;
    if (event.dataTransfer?.files) {
      this.processDocFiles(event.dataTransfer.files);
    }
  }

  processDocFiles(files: FileList) {
    Array.from(files).forEach((file) => {
      if (this.isValidFile(file)) {
        const reader = new FileReader();
        reader.onload = (e) => this.documentPreviews.push(e.target?.result as string);
        reader.readAsDataURL(file);
      }
    });

    this.showDocError = this.documentPreviews.length === 0;
  }

  removeDocument(index: number) {
    this.documentPreviews.splice(index, 1);
    this.showDocError = this.documentPreviews.length === 0;
  }

  // Video methods
  addVideo() {
    this.videos.push({ title: '', url: '', description: '' });
  }

  removeVideo(index: number) {
    this.videos.splice(index, 1);
  }

  // Virtual tour methods
  addVirtualTour() {
    this.virtualTours.push({ title: '', url: '', description: '' });
  }

  removeVirtualTour(index: number) {
    this.virtualTours.splice(index, 1);
  }

  // Utility function for all file uploads
  isValidFile(file: File): boolean {
    const validTypes = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png'];
    const isValid = validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024; // 5MB limit
    if (!isValid) alert('Invalid file type or size exceeds 5MB');
    return isValid;
  }





  onSubmit() {
    
    console.log('Photos:', this.imagePreviews);
    console.log('Floor Plans:', this.floorPreviews);
    console.log('Documents:', this.documentPreviews);
    console.log('Videos:', this.videos);
    console.log('Virtual Tours:', this.virtualTours);
  
    
  }
  

}