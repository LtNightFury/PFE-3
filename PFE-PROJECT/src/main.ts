import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import './assets/leaflet-fix';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
