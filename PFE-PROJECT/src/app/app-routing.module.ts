import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './components/layout/default-layout/default-layout.component';
import { GeneralComponent } from './components/layout/pages/general/general.component';
import { LocationComponent } from './components/layout/pages/location/location.component';
import { SpecificationComponent } from './components/layout/pages/specification/specification.component';
import { MainContentComponent } from './components/layout/main-content/main-content.component';
import { AmenitiesComponent } from './components/layout/pages/amenities/amenities.component';
import { MediaComponent } from './components/layout/pages/media/media.component';
import { PriceComponent } from './components/layout/pages/price/price.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'general', component: GeneralComponent },
      { path: 'location', component: LocationComponent },
      { path: 'specification', component: SpecificationComponent },
      { path: 'amenities', component: AmenitiesComponent },
      { path: 'media', component: MediaComponent },
      { path: 'price', component: PriceComponent }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
