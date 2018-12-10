//onload


//assign class to current position
//$( "#navButtons" ).find( "li" ).eq().addClass( "active" );

let app1Coords = $("#firstGraphic img").offset();
console.log(app1Coords.left);

//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

//first canvas
let app1 = new PIXI.Application({ 
    width: 800,         // default: 800
    height: 600,        // default: 600
    antialias: true,    // default: false
    transparent: true, // default: false
    resolution: 1       // default: 1
  }
);
document.body.appendChild(app1.view);
$("canvas").offset(app1Coords); //scoots the canvas element to the position of the first image

//load an image and run the `setup` function when it's done
loader
  .add("media/coffeemug.png")
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

  //Create the cat sprite
  let mug = new Sprite(resources["media/coffeemug.png"].texture);
  mug.x = 550;
  mug.y = 340;
  //Add the cat to the stage
  app1.stage.addChild(mug);
}