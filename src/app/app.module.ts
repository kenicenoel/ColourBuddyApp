import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ColourChartComponent } from './colour-chart/colour-chart.component';
import { RandomColourService } from '../services/randomcolourservice';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list'
import {MatButtonModule} from '@angular/material/button'
@NgModule({
  declarations: [
    AppComponent,
    ColourChartComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatTooltipModule,
    MatGridListModule,
    MatButtonModule
  ],
  providers: [
    RandomColourService
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
