import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpreadsheetReaderComponent } from './spreadsheet-reader/spreadsheet-reader.component';
import { GraphsComponent } from './graphs/graphs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpreadsheetReaderComponent, GraphsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'code-test';
}
