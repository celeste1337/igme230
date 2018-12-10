//the insanity that is pixijs

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

//text stuff
var style = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 20,
  fill: '#fcf4ff', // gradient
  stroke: '#512b60',
  strokeThickness: 1.5,
  wordWrap: true,
  wordWrapWidth: 650
});
var descriptionText = new PIXI.Text('',style);
descriptionText.x = 30;
descriptionText.y = 530;
app1.stage.addChild(descriptionText);


//load an image and run the `setup` function when it's done
loader
  .add("media/coffeemug.png")
  .add("media/umbrella.png")
  .add("media/books.png")
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {
    //mug sprite
    let mug = new Sprite(resources["media/coffeemug.png"].texture);
    mug.x = 550;
    mug.y = 340;
    mug.interactive = true;
    mug.buttonMode = true;
    mug.on('pointerdown', (event) => {
      descriptionText.text = "This is a mug. Probably the ugliest mug you've ever seen. Whatever was left in it is long gone now, but there's tea leaves at the bottom.";
    });
    app1.stage.addChild(mug);

    //umbrella sprite
    let umbrella = new Sprite(resources["media/umbrella.png"].texture);
    umbrella.x = 675;
    umbrella.y = 250;
    umbrella.interactive = true;
    umbrella.buttonMode = true;
    umbrella.on('pointerdown', (event) => {
      descriptionText.text = "A bright and cheery umbrella, something Zooey Deschanel would own.";
    });
    app1.stage.addChild(umbrella);

    //books sprite
    let books = new Sprite(resources["media/books.png"].texture);
    books.x = 150;
    books.y = 300;
    books.interactive = true;
    books.buttonMode = true;
    books.on('pointerdown', (event) => {
      descriptionText.text = "A bunch of textbooks, mostly anatomy ones.";
    });
    app1.stage.addChild(books);
}

