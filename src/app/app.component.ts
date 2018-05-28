import { Component } from '@angular/core';
import { RandomColourService } from '../services/randomcolourservice';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'app';
  numberOfColourCharts = 20;
  colourCharts:any[] = [];
  numberOfColours:Number = 4;
  colours:string[] = [];
  constructor(private randomColourService:RandomColourService) 
  { 
    for(let i = 0; i<this.numberOfColourCharts; i++)
    {
      this.colourCharts.push(i);
    }

    for(let i = 0; i< this.numberOfColours; i++) 
    {
      let colour = randomColourService.getRandomColor({
        luminosity: 'bright'
      });
      this.colours.push(colour);
    }

    
  }
 
}
