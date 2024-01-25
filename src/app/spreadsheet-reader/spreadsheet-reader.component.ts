import { Component, EventEmitter, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import { GraphsComponent } from '../graphs/graphs.component';

@Component({
  selector: 'spreadsheet-reader',
  standalone: true,
  templateUrl: './spreadsheet-reader.component.html',
  styleUrl: './spreadsheet-reader.component.css'
})
export class SpreadsheetReaderComponent {

  file: File | null = null;
  allSheetData: any[] = []; // Array to store JSON objects for each sheet

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  async readSpreadsheet(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      if (this.file) {
        const reader: FileReader = new FileReader();

        reader.onload = (e: any) => {
          const binaryString: string = e.target.result;
          const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });

          // Get all sheet names
          const sheetNames: string[] = workbook.SheetNames;

          // Iterate through all sheets
          sheetNames.forEach(sheetName => {
            const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

            // Parse the data from the worksheet
            const sheetData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Store sheet name and data as a JSON object
            const sheetObject = {
              sheetName: sheetName,
              sheetData: sheetData
            };
            //add sheet data to array
            this.allSheetData.push(sheetObject);
          });
          const childComponent = new GraphsComponent();
          childComponent.receiveData(this.allSheetData);
           // Return the array of sheet data
           resolve(this.allSheetData);
        };

        reader.readAsBinaryString(this.file);
      }
      
    })
  }
}
