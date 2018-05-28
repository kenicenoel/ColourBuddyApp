import { Component, OnInit } from '@angular/core';
import { RandomColourService } from '../../services/randomcolourservice';

@Component({
  selector: 'app-colour-chart',
  templateUrl: './colour-chart.component.html',
  styleUrls: ['./colour-chart.component.css']
})
export class ColourChartComponent
 {

  numberOfColours:Number = 4;
  colours:string[] = [];
  constructor(private randomColourService:RandomColourService) 
  { 
    for(let i = 0; i< this.numberOfColours; i++)
    {
      let colour = randomColourService.getColour();
      this.colours.push(colour);
    }
  }



}
