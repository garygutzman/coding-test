import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { SpreadsheetReaderComponent } from './app/spreadsheet-reader/spreadsheet-reader.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


