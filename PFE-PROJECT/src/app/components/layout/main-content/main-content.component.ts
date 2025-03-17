import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import{ FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  activeTab: string = '';

  constructor(private router: Router, private route: ActivatedRoute,
    private formDataService: FormDataService
  ) {}

  ngOnInit() {
    // Listen to route changes and update the activeTab accordingly
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.route.snapshot.firstChild?.url[0]?.path;
        this.activeTab = currentRoute ? this.capitalizeFirstLetter(currentRoute) : 'general';
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  saveAllData() {
    this.formDataService.submitFormData();
  }

}
