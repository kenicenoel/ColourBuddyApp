import { Injectable } from '@angular/core';
var ramdomColor = require('randomcolor');
@Injectable()
export class RandomColourService
 {
    public colorDictionary: any = {};

    constructor() {}

   getColour()
   {
       return ramdomColor();
   }
}