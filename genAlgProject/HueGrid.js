"use strict";

/* TO-DO
 * none!
 *
 * ABOUT
 * huegrid class written by celeste yost with help from al biles.
 * basically - it makes the huegrid
 * reset changes all the things about it - cellsize, pattern, color changing pattern, stroke, and opacity
 */



class HueGrid {

    constructor(chrom, x, y, width, height) {
        this.xOr = x;
        this.yOr = y;
        this.width = width;
        this.height = height;


        this.hueVal;
        this.cellSize;
        this.maxDev;
        this.initMeth;
        this.satValue;
        this.opaGene;
        this.opa;
        this.hue = 0;
        this.alter;
        this.stroke;

        this.fitnessVal = 0;

        this.chrom = chrom;
        this.reset(chrom);
    }

    reset(chrom) {
        //all chromosome stuff goes here
        this.chrom = chrom;


        this.cellSize = (this.chrom & 15) + 3;
        this.initMeth = (this.chrom >>> 4) & 3;
        this.alter = (this.chrom >>> 6) & 3;
        this.stroke = (this.chrom >>> 8) & 1;

        //opacity is separate but still part of the chrom
        this.opaGene = (this.chrom >>> 9) & 7;
        this.opa = (this.opaGene + 1) * 0.125;



        //end chromosome stuff

        //DRAWING THINGS
        background(100);




        // Calculate row & column lengths from window dimensions & cSize
        // Have to round down to get integer values for array dimensions
        let rowLeng = Math.floor(this.width / this.cellSize);
        let colLeng = Math.floor(this.height / this.cellSize);
        let hueScale = 360.0 / (rowLeng + colLeng); // Used for Gradient

        this.hueVal = []; // It's an array (of arrays)


        for (let i = 0; i < rowLeng; i++) {
            this.hueVal[i] = []; // Each element is an array
            for (let j = 0; j < colLeng; j++) {
                this.hueVal[i][j] = this.initHue(i, j, hueScale);
            }
        }

    } //end reset

    initHue(i, j, hueScale) {
        this.hue = 0;


        switch (this.initMeth) {
            case 0: //random
                this.hue = random(360);
                break;
            case 1: //stripes
                this.hue = ((i + j) * 15) % 360;
                break;
            case 2: //parabola stuff? just kind of curvy
                this.hue = i * j % 360;
                break;
            case 3: //even more random honestly this one is weird its like a wave with particles that dont do that  i just thought it was neat
                this.hue = ((i - j) + 50) % random(360);
        }
        return this.hue;
    } //end init

    display() {
        push();
        translate(this.xOr, this.yOr);


        if (this.stroke)
            stroke(0);
        else
            noStroke();

        // Get current max deviation
        this.maxDev = mxDvSlider.value();


        // Draw all the cells in the 2D array on the canvas
        for (let i = 0; i < this.hueVal.length; i++) {
            for (let j = 0; j < this.hueVal[i].length; j++) {
                // Alter this cell's hue value
                this.hueVal[i][j] = this.alterHue(this.hueVal[i][j]);
                // Use the hueValue to set the fill for this cell
                fill(this.hueVal[i][j], 100, 100, this.opa);

                // Location is the loop indices scaled by the cell size
                rect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
            }
        }

        pop();
    } //end display

    alterHue(hue) { //changes color patterns
        switch (this.alter) {
            case 0: //random
                hue += random(-this.maxDev, this.maxDev);
                if (hue > 360)
                    hue -= 360;
                else if (hue < 0)
                    hue += 360;
                break;
            case 1: //mosaic fwd
                hue += this.maxDev / 2;
                if (hue > 360)
                    hue -= 360;
                else if (hue < 0)
                    hue += 360;
                break;
            case 2: //mosaic bckwd
                hue -= this.maxDev / 2;
                if (hue > 360)
                    hue -= 360;
                else if (hue < 0)
                    hue += 360;
                break;
            case 3: //poisson
                let bound = random(this.maxDev);
                hue += random(-bound, bound);
                if (hue > 360)
                    hue -= 360;
                else if (hue < 0)
                    hue += 360;
                break;
        }


        return hue;

    } //end alterhue

    stToggle() { //toggle stroke
        this.strokeOn = !this.strokeOn;
    }

    isInside() { //sees if the mouse is inside the windowlet
        if (mouseX > this.xOr && mouseX < this.xOr + this.width && mouseY > this.yOr && mouseY < this.yOr + this.height) {
            return true;
        } else {
            return false;
        }
    }

}
