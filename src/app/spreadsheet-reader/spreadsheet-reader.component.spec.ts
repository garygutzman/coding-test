import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadsheetReaderComponent } from './spreadsheet-reader.component';

describe('SpreadsheetReaderComponent', () => {
  let component: SpreadsheetReaderComponent;
  let fixture: ComponentFixture<SpreadsheetReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpreadsheetReaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpreadsheetReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
