import { Injectable } from '@angular/core';

@Injectable()
export class RandomColourService {
    public colorDictionary: any = {};

   constructor() {}

   private defineColor (name: any, hueRange: any, lowerBounds: any) {
    let sMin = lowerBounds[0][0],
        sMax = lowerBounds[lowerBounds.length - 1][0],

        bMin = lowerBounds[lowerBounds.length - 1][1],
        bMax = lowerBounds[0][1];

    this.colorDictionary[name] = {
        hueRange: hueRange,
        lowerBounds: lowerBounds,
        saturationRange: [sMin, sMax],
        brightnessRange: [bMin, bMax]
    };

}

private loadColorBounds () {
    this.defineColor(
        'monochrome',
        null,
        [[0,0],[100,0]]
    );

    this.defineColor(
        'red',
        [-26,18],
        [[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]
    );

    this.defineColor(
        'orange',
        [19,46],
        [[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]
    );

    this.defineColor(
        'yellow',
        [47,62],
        [[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]
    );

    this.defineColor(
        'green',
        [63,178],
        [[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]
    );

    this.defineColor(
        'blue',
        [179, 257],
        [[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]
    );

    this.defineColor(
        'purple',
        [258, 282],
        [[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]
    );

    this.defineColor(
        'pink',
        [283, 334],
        [[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]]
    );

}

private rand(min: number, max: number) {
    return parseInt((Math.random() * (max-min+1)).toString(), 10) + min;
}

public getRandomColor(options: any = {}) {
    this.loadColorBounds();

    // First we pick a hue (H)
    let H = this.pickHue(options);

    // Then use H to determine saturation (S)
    let S = this.pickSaturation(H, options);

    // Then use S and H to determine brightness (B).
    let L = this.pickBrightness(H, S, options);

    return 'hsl(' + H + ',' + S + '%,' + L + '%)';
}

private randomWithin (range: any) {
    return Math.floor(range[0] + Math.random()*(range[1] + 1 - range[0]));
}

private pickHue (options: any) {
    let hueRange = this.getHueRange(options.hue),
        hue = this.randomWithin(hueRange);

    // Instead of storing red as two seperate ranges,
    // we group them, using negative numbers
    if (hue < 0) {hue = 360 + hue;}

    return hue;
}

private getHueRange (colorInput: any) {
    if (typeof parseInt(colorInput) === 'number') {

        let number = parseInt(colorInput);

        if (number < 360 && number > 0) {
        return [number, number];
        }

    }

    if (typeof colorInput === 'string') {

        if (this.colorDictionary[colorInput]) {
            let color = this.colorDictionary[colorInput];

            if (color.hueRange) {return color.hueRange;}
            } else if (colorInput.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)) {
                let hasHue: number[] = this.HexToHSB(colorInput);
                let hue: number = 0;

                if(hasHue != null) {
                    hue = hasHue[0];
                }

                return [ hue, hue ];
            }
        }

    return [0,360];
}

private pickSaturation (hue: any, options: any) {
    if (options.hue === 'monochrome') {
        return 0;
    }

    if (options.luminosity === 'random') {
        return this.randomWithin([0,100]);
    }

    let saturationRange = this.getSaturationRange(hue);

    let sMin = saturationRange[0],
        sMax = saturationRange[1];

    switch (options.luminosity) {

        case 'bright':
            sMin = 55;
            break;

        case 'dark':
            sMin = sMax - 10;
            break;

        case 'light':
            sMax = 55;
            break;
    }

    return this.randomWithin([sMin, sMax]);
}

private getSaturationRange (hue: any) {
    return this.getColorInfo(hue).saturationRange;
}

private pickBrightness (H: any, S: any, options: any) {
    let bMin = this.getMinimumBrightness(H, S),
        bMax = 100;

    switch (options.luminosity) {

        case 'dark':
        bMax = bMin + 20;
        break;

        case 'light':
        bMin = (bMax + bMin)/2;
        break;

        case 'random':
        bMin = 0;
        bMax = 100;
        break;
    }

    return this.randomWithin([bMin, bMax]);
}

private getMinimumBrightness(H: any, S: any) {
    let lowerBounds = this.getColorInfo(H).lowerBounds;

    for (let i = 0; i < lowerBounds.length - 1; i++) {

        let s1 = lowerBounds[i][0],
            v1 = lowerBounds[i][1];

        let s2 = lowerBounds[i+1][0],
            v2 = lowerBounds[i+1][1];

        if (S >= s1 && S <= s2) {

            let m = (v2 - v1)/(s2 - s1),
                b = v1 - m*s1;

            return m*S + b;
        }

    }

    return 0;
}

private getColorInfo (hue: any) {
    // Maps red colors to make picking hue easier
    if (hue >= 334 && hue <= 360) {
        hue-= 360;
    }

    for (let colorName in this.colorDictionary) {
        let color = this.colorDictionary[colorName];
        if (color.hueRange &&
            hue >= color.hueRange[0] &&
            hue <= color.hueRange[1]) {
            return this.colorDictionary[colorName];
        }
    } return 'Color not found';
}

private HexToHSB (hex: any): number[] {
    let result: number[] = [];

    hex = hex.replace(/^#/, '');
    hex = hex.length === 3 ? hex.replace(/(.)/g, '$1$1') : hex;

    let red = parseInt(hex.substr(0, 2), 16) / 255,
            green = parseInt(hex.substr(2, 2), 16) / 255,
            blue = parseInt(hex.substr(4, 2), 16) / 255;

    let cMax = Math.max(red, green, blue),
            delta = cMax - Math.min(red, green, blue),
            saturation = cMax ? (delta / cMax) : 0;

    switch (cMax) {
        case red: result = [ 60 * (((green - blue) / delta) % 6) || 0, saturation, cMax ];
        case green: result = [ 60 * (((blue - red) / delta) + 2) || 0, saturation, cMax ];
        case blue: result = [ 60 * (((red - green) / delta) + 4) || 0, saturation, cMax ];
    }

    return result;
}


   hslToHex(h, s, l) {
    var r, g, b;
    if(s == 0)
    {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

        var rgbColor = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        var hexA = Math.round(r * 255);
        let hexB = Math.round(g * 255);
        let hexC = Math.round(b * 255);

        return hexA.toString(16)+hexB.toString(16)+hexC.toString(16);

    }
}