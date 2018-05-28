import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ColourChartComponent } from './colour-chart/colour-chart.component';
import { RandomColourService } from '../services/randomcolourservice';

@NgModule({
  declarations: [
    AppComponent,
    ColourChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    RandomColourService
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
