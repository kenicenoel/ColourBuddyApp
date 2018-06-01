import { Component } from '@angular/core';
import { RandomColourService } from '../services/randomcolourservice';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Color } from './model/color';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'app';
  numberOfColourCharts = 20;
  colourCharts:any[] = [];
  colourMode:string;


  constructor(private randomColourService:RandomColourService) 
  { 
   
    this.colourMode = randomColourService.colourMode;

    
  }

  toggleColourMode()
  {
    this.randomColourService.toggleColourMode()
    .then((colourMode:string)=>
    {
      this.colourMode = colourMode;
    })
  }

 
 
}
