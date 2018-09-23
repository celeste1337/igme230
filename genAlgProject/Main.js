"use strict"
/*
 * additions by celeste yost - everything that is no longer useful is commented out.
 * this is for project 3 phase 3.
 */


let cnv; // Global variable for the canvas

let mxDvSlider; // Slider for setting maxDev
let mxDvLabel; // Its label

let resetBut; // Button to trigger a reset of the entire HueGrid



let huGd; //array of hue grids
let hG;

let xOr;
let yOr;

let gn;

let mutBut;
let crossBut;
let selBut;
let breedBut;
let breedGenBut;

function setup() {
    cnv = createCanvas(960, 720); // Create & position canvas on window
    cnv.position(20, 80);
    colorMode(HSB, 360, 100, 100, 1);
    background(100); // White background - same as window's

    // Turn off stroke to start & set up a button to toggle it on/off
    noStroke();


    // Make a slider to control the maximum deviation
    // Min value 0, Max value 50, intial value 5, step size 0 => continuous
    mxDvSlider = createSlider(0, 50, 5, 0);
    mxDvSlider.position(20, 20);
    // Make a label just under the slider
    mxDvLabel = createDiv("Max Dev");
    mxDvLabel.position(mxDvSlider.x + 2, mxDvSlider.y + 20);


    // Reset button calls reset() function when pressed
    resetBut = createButton("Reset");
    resetBut.position(width - 30, height + 110);
    resetBut.mousePressed(reset);


    // mutate button calls mutate() function when pressed
    mutBut = createButton("Mutate");
    mutBut.position(width - 90, height + 110);
    mutBut.mousePressed(doMutate);


    // cross button calls cross() function when pressed
    crossBut = createButton("Crossover");
    crossBut.position(width - 170, height + 110);
    crossBut.mousePressed(doCross);

    // selection button calls selection() function when pressed
    selBut = createButton("Select");
    selBut.position(width - 240, height + 110);
    selBut.mousePressed(doSelect);

    // breed button calls breed() function when pressed
    breedBut = createButton("Breed");
    breedBut.position(width - 300, height + 110);
    breedBut.mousePressed(doBreed);

    // breedGen button calls newGen() function when pressed
    breedGenBut = createButton("Breed Gen");
    breedGenBut.position(width - 390, height + 110);
    breedGenBut.mousePressed(doNewGen);

    huGd = [];

    //make genetics class
    gn = new Genetics(12, 9);

    //1
    huGd[0] = new HueGrid(gn.newChrom(), 20, 20, 300, 200);
    gn.insertNew(0, huGd[0].chrom, 0);

    //2
    huGd[1] = new HueGrid(gn.newChrom(), 340, 20, 300, 200);
    gn.insertNew(1, huGd[1].chrom, 0);

    //3 - last one with just x
    huGd[2] = new HueGrid(gn.newChrom(), 660, 20, 300, 200);
    gn.insertNew(2, huGd[2].chrom, 0);

    //4 x and y
    huGd[3] = new HueGrid(gn.newChrom(), 20, 240, 300, 200);
    gn.insertNew(3, huGd[3].chrom, 0);

    //5
    huGd[4] = new HueGrid(gn.newChrom(), 340, 240, 300, 200);
    gn.insertNew(4, huGd[4].chrom, 0);

    //6
    huGd[5] = new HueGrid(gn.newChrom(), 660, 240, 300, 200);
    gn.insertNew(5, huGd[5].chrom, 0);

    //7 (x and y)*2
    huGd[6] = new HueGrid(gn.newChrom(), 20, 460, 300, 200);
    gn.insertNew(6, huGd[6].chrom, 0);

    //8
    huGd[7] = new HueGrid(gn.newChrom(), 340, 460, 300, 200);
    gn.insertNew(7, huGd[7].chrom, 0);

    //9
    huGd[8] = new HueGrid(gn.newChrom(), 660, 460, 300, 200);
    gn.insertNew(8, huGd[8].chrom, 0);


}



function draw() {
    // Get current max deviation
    mxDvLabel.html("Max Dev:  " + Math.round(mxDvSlider.value()));

    for (let i = 0; i < huGd.length; i++) {
        huGd[i].display();
    }

}


//button stuff!

function reset() { //resets the whole huegrid
    for (let i = 0; i < huGd.length; i++) {
        huGd[i].reset(gn.newChrom());
        gn.insertNew(i, huGd[i].chrom, huGd[i].fitnessVal);
    }

}

function doMutate() { //does the mutation
    let mutChrom = gn.mutation(huGd[0].chrom);
    huGd[0].reset(mutChrom);
}

function doCross() { //does the crossover
    let crossMe = gn.crossover(huGd[0].chrom, huGd[1].chrom);
    huGd[0].reset(crossMe);
}

function doSelect() {
    huGd[0].reset(gn.selection());
    gn.insertNew(0, huGd[0].chrom, huGd[0].fitnessVal);
}

function doBreed() {
    gn.insertNew(0, gn.breed1(), huGd[0].fitnessVal);
}

function doNewGen() { //nextgen basically stores chromosomes and then puts the chroms into the population array and then resets huegrid
    let nextGenArray = [];

    //bestBoy lives at position 0
    //elitism returns a chrom 
    let bestBoy = gn.elitism();
    nextGenArray[0] = bestBoy;

    //basically makes the rest of the array
    //index 1-8
    //loops until huGd is done bc thats how many huegrids there are and that way its not a fixed number (goes from 1-8)
    for (let j = 1; j < huGd.length; j++) {
        nextGenArray[j] = gn.breed1();
        console.log("hi");
    }

    //now puts all of nextgen into population in genetics
    //index 0-8
    //insert nextgen[i] into genetics class population array[i] with fitness val of 0
    if (nextGenArray.length == 9) {
        for (let i = 0; i < nextGenArray.length; i++) {
            gn.insertNew(i, nextGenArray[i], 0);
            huGd[i].reset(nextGenArray[i]);
        }
    }
    
    //technically this does stuff and it doesnt throw errors but im not sure if the result was the desired result by prof
    //the screenshot he provided doesnt really help in terms of knowing what it should do
    //i followed all the instructions as best as i could and this was the result
}

//end buttons


function keyTyped() { //bumps the fitness value by typing stuff
    for (let i = 0; i < huGd.length; i++) {
        if (huGd[i].isInside()) { //if its inside
            if (key === "+") { //and if it types plus
                gn.incrementMe(i, 1); //plus one!
            } else if (key === "-") { //if its -
                gn.incrementMe(i, -1); //add negative 1
            }
        }

    }

}
