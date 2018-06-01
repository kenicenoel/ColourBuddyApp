import { Component, OnInit } from '@angular/core';
import { RandomColourService } from '../../services/randomcolourservice';
import { Color } from '../model/color';

@Component({
  selector: 'app-colour-chart',
  templateUrl: './colour-chart.component.html',
  styleUrls: ['./colour-chart.component.css']
})
export class ColourChartComponent {

  numberOfColours:Number = 4;
  colours:Color[] = [];
  colourMode:string = "../assets/imgs/icons/brightness-46.svg";
  luminosity:string = 'bright';
  numberOfColourCharts = 20;
  colourCharts:any[] = [];
  constructor(private randomColourService:RandomColourService) 
  { 
    this.colours = [];
    this.populateColourCharts();
    this.generateColors();
    
  }

   
  generateId() 
  {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  
  generateColors()
  {
    this.luminosity = this.colourMode == '../assets/imgs/icons/brightness-46.svg' ? 'bright': 'dark';
    for(let i = 0; i < this.numberOfColours; i++)
    {
      let colour = this.randomColourService.getRandomColor({
        luminosity: this.luminosity
      });

      let clr:Color =
      {
        id:this.generateId(),
        hsl:colour,
        hex:this.randomColourService.hslToHexV2(colour),
        likes: 0
      }

      this.colours.push(clr);
    }
               
  }

  likeColourCard(colour:Color)
  {
    colour.likes++;
  }

  populateColourCharts()
  {
    for(let i = 0; i < this.numberOfColourCharts; i++)
    {
      this.colourCharts.push(i);
    }

  }

}





