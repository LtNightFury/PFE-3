import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './components/layout/default-layout/default-layout.component';
import { SideNavComponent } from './components/layout/side-nav/side-nav.component';
import { MainContentComponent } from './components/layout/main-content/main-content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeneralComponent } from './components/layout/pages/general/general.component';
import {MatDividerModule} from '@angular/material/divider';
import { LocationComponent } from './components/layout/pages/location/location.component';
import { SpecificationComponent } from './components/layout/pages/specification/specification.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AmenitiesComponent } from './components/layout/pages/amenities/amenities.component';
import { PriceComponent } from './components/layout/pages/price/price.component';
import { MediaComponent } from './components/layout/pages/media/media.component';
import { PublicationComponent } from './components/layout/pages/publication/publication.component';
import { ContactsComponent } from './components/layout/pages/contacts/contacts.component';
import { DropdownComponent } from './components/layout/dropdown/dropdown.component';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';






@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    SideNavComponent,
    MainContentComponent,
    GeneralComponent,
    LocationComponent,
    SpecificationComponent,
    AmenitiesComponent,
    PriceComponent,
    MediaComponent,
    PublicationComponent,
    ContactsComponent,
    DropdownComponent,
    MapComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    HttpClientModule
    
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
