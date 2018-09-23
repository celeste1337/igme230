"use strict";

//genetics class by celeste yost
// does all the genetics work!


class Genetics {

    constructor(chromBits, popSize) {
        this.chromBits = chromBits; //num of chrom
        this.chromNum; //new chrom
        this.popSize = popSize;

        this.population = []; //population size ACTUALLY the chrom array
        this.fitness = []; //fitness array

    }

    // other classes go here

    newChrom() { //generates a new chromosome (to put into main)
        this.chromNum = Math.floor(random(2 ** this.chromBits));
        return this.chromNum;

        //THIS WORKS!
    }

    selection() {
        //The selection operator will return a chromosome that has been selected randomly from the population but biased by the fitness values of the individuals in the population.
        //NO PARAMETERS

        //first random individual
        let boy1 = Math.floor(random(0, this.popSize));

        //second random individual
        let boy2 = Math.floor(random(0, this.popSize));


        //who has the highest fitness?
        if (this.fitness[boy1] > this.fitness[boy2]) {
            return this.population[boy1];
        } else {
            return this.population[boy2];
        }

        //THIS WORKS!
    }


    insertNew(index, chrom, fitnessVal) {
        //This method should have 3 parameters: an index from 0-8, a chromosome, and a fitness value. It should copy the chromosome into the population array at that index and the fitness value into the fitness array at the same index.

        this.population[index] = chrom;
        this.fitness[index] = fitnessVal;


        //THIS WORKS!
    }

    incrementMe(index, addFit) {
        huGd[index].fitnessVal += addFit;
        this.fitness[index] = huGd[index].fitnessVal;
        //increments fitness - if addFit is negative, it adds a negative 1 (subtracts 1), otherwise just adds 1

        print(index, huGd[index].fitnessVal);

        //THIS WORKS!
    }


    mutation(chromBefore) { //mutates the chromosome using the "old" chrom
        //Generate a random integer called, say, bitLocation in the range from 0 to less than the chromosome length 
        let bitLocation = Math.floor(random(0, this.chromBits));

        //Create a "mask" for the mutation by computing 2 ** bitLocation, which will have a 1 in the random bitLocation place and 0's everywhere else
        let maskedMut = 2 ** bitLocation - 1;

        //Do the actual mutation by performing an exclusive or (the ^ operator) between the chromosome you passed in and the mask
        let realMut = chromBefore ^ maskedMut;


        //return mutated
        return realMut;

        //THIS WORKS!
    }

    crossover(parent1, parent2) { //crossover for 2 parent chroms (from main) and generates a child chrom to use for crossover button
        //Randomly generate a crossover point which could range from 1 to the chromosome length - 1
        let crossoverPt = Math.floor(random(1, this.chromBits - 1));

        //Get the bits to the left of that point from one parent and the bits to the right from the other parent
        let theLeft = (parent1 >>> crossoverPt) << crossoverPt;

        let rightMask = (2 ** crossoverPt) - 1;
        let theRight = (parent2 & rightMask);

        //"OR" the two contributions together (the | operator) to yield a new chromosome
        let babyChrom = theLeft | theRight;

        //return child
        return babyChrom;

        //THIS WORKS!
    }

    breed1() { //breeds one new kid, no parameters and returns the chromosome after going through all the hoops (selection, crossover, mutation)
        let parent1 = this.selection();
        let parent2 = this.selection();

        let marriage = this.crossover(parent1, parent2);

        let mutMarriage = this.mutation(marriage);

        console.log("im mutmarriage: " + mutMarriage);

        return mutMarriage;

    }

    elitism() { //compares fitness vals and then stores the index of the bigger one, returns chrom (in population) with the index
        let maxFit = 0;

        for (let i = 1; i < this.fitness.length; i++) {
            if (this.fitness[i] > this.fitness[maxFit]) {
                maxFit = i;
            }
        }

        console.log(this.population[maxFit]);
        return this.population[maxFit];

    }
}
