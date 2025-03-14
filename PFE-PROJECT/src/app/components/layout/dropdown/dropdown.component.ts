import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  @Input() options: { value: string; label: string; disabled?: boolean }[] = [];
  @Input() placeholder: string = 'Select an option';
  @Output() optionSelected = new EventEmitter<string>();
  
  selectedOption: string | null = null;
  isOpen: boolean = false;
  
  constructor() {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown')) {
        this.isOpen = false;
      }
    });
  }
  
  toggleDropdown() {
    this.isOpen = !this.isOpen;
    event?.stopPropagation();
  }
  
  selectOption(option: { value: string; label: string; disabled?: boolean }) {
    if (option.disabled) {
      return; // Don't select disabled options
    }
    
    this.selectedOption = option.label;
    this.isOpen = false;
    this.optionSelected.emit(option.value);
  }
}