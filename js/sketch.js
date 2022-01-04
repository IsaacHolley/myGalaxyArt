//global variables
var buttonStar, buttonTardis, buttonNebula, img, nebulaSize, buttonPosition
nebulaBrush = clearButton = starBrush = eraser = pen = galaxyBrush = false

let colorPicker;
let galaxyMix = [];


function preload() {
    
    //preload images
    img = loadImage('assets/nebula.png');
    galaxy = loadImage('assets/galaxyBrush2.png')

    galaxyMix[0] = loadImage('assets/nebula.png');
    galaxyMix[1] = loadImage('assets/galaxyBrush2.png')
    galaxyMix[2] = loadImage('assets/galaxyBrush3.png');
    galaxyMix[3] = loadImage('assets/galaxyBrush4.png')
    galaxyMix[4] = loadImage('assets/galaxyBrush5.png');
    galaxyMix[5] = loadImage('assets/galaxyBrush2.png')
  }

function setup() {
    var canvas = createCanvas(900, 500);
    background(0);
    frameRate(13);
    canvas.parent("p5container");

    nebulaSize = 200
    buttonPosition = 20

    // Buttons

    // Erase
    buttonErase = createButton("Eraser");
    buttonErase.addClass('btn');
    buttonErase.position(buttonPosition, 350);
    buttonErase.mousePressed(()=>{
        eraser = true;
        nebulaBrush = false;
        starBrush = false;
        galaxyBrush = false;
        pen = false;
     });

     //Star Brush
    buttonStar = createButton("Star Brush");
    buttonStar.addClass('btn');
    buttonStar.position(buttonPosition, 200);
    buttonStar.mousePressed(()=>{
        starBrush = true;
        nebulaBrush = false;
        eraser = false;
        galaxyBrush = false;
        pen = false;
     });

     //Galaxy brush
    buttonGalaxy = createButton("Galaxy Brush");
    buttonGalaxy.addClass('btn');
    buttonGalaxy.position(buttonPosition, 150);
    buttonGalaxy.mousePressed(()=>{
        galaxyBrush = true;
        nebulaBrush = false;
        starBrush = false;
        eraser = false;
        pen = false;
     });


    // Nebula brush
    buttonNebula = createButton("Nebula Brush");
    buttonNebula.addClass('btn');
    buttonNebula.position(buttonPosition, 250);
    buttonNebula.mousePressed(()=>{
        nebulaBrush = true;
        starBrush = false;
        eraser = false;
        galaxyBrush = false;
        pen = false;
     });

    // Pen
    buttonPen = createButton("Pencil");
    buttonPen.addClass('btn');
    buttonPen.position(buttonPosition, 300);
    buttonPen.mousePressed(()=>{
        pen = true;
        nebulaBrush = false;
        starBrush = false;
        eraser = false;
        galaxyBrush = false;

        colorPicker = createColorPicker('#fffff');
        colorPicker.position(buttonPosition, 450); 
        colorPicker.addClass('penColor');

     });

     // Clear button
     buttonClear = createButton("Clear button");
     buttonClear.addClass('btn');
     buttonClear.position(buttonPosition, 400);
     buttonClear.mousePressed(()=>{
         clearButton = true;
      });
 }


function draw() {
    var randomBrush = int(random(0, 5));

    //Clear button
    if(clearButton === true){
        background(0);
        clearButton = false;
        nebulaBrush = false;
        starBrush = false;
    }

    //Brushes
    if (mouseIsPressed) {
      if (eraser === true){
            stroke(0);
            strokeWeight(50);
            line(mouseX, mouseY, pmouseX, pmouseY);
      }

      if (nebulaBrush === true){
      imageMode(CENTER);
      image(img, mouseX, mouseY, nebulaSize, nebulaSize);
    }

    if (galaxyBrush === true){
        imageMode(CENTER);
        image(galaxyMix[randomBrush], mouseX, mouseY, nebulaSize, nebulaSize);
      }

    if (starBrush === true){
        fill(255);
        noStroke();
        ellipse(mouseX, mouseY, 5, 5);
      }

      if (pen === true){ 
        stroke(colorPicker.color());
        strokeWeight(5);
        line(mouseX, mouseY, pmouseX, pmouseY);
      }
      console.log(nebulaBrush)
  } 

    }
    
function keyPressed(){
    // Key presses to increase size
    if(keyCode === UP_ARROW && nebulaSize <= 500){
        nebulaSize = nebulaSize + 100
    } else if(keyCode === DOWN_ARROW && nebulaSize >= 200){
        nebulaSize = nebulaSize - 100
    }
}