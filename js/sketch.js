//global variables
var buttonStar, buttonTardis, buttonPlanet, img, nebulaSize, buttonPosition, doctorTheme, sel, glowStar, planetBrush1;
planetBrush = clearButton = starBrush = eraser = pen = galaxyBrush = randomGalaxy = starField = randomPlanets = false;

let colorPicker;
let galaxyMix = [];
let glowStarBrush = [];
let planets = [];
//let starBrush = [];

var test = document.getElementById("myTextArea").value;

function preload() {

    //preload music 
    doctorTheme = loadSound('assets/doctorWho.mp3');
    starTrek = loadSound('assets/starTrek.mp3')
    clairDeLune = loadSound('assets/clairDeLune.mp3')
    
    //preload images
    img = loadImage('assets/nebula.png');
    galaxy = loadImage('assets/galaxyBrush2.png')
    glowStar = loadImage('assets/glowStar.png');
    planetBrush1 = loadImage('assets/planetBrush1.png')

    galaxyMix[0] = loadImage('assets/nebula.png');
    galaxyMix[1] = loadImage('assets/galaxyBrush2.png')
    galaxyMix[2] = loadImage('assets/galaxyBrush3.png');
    galaxyMix[3] = loadImage('assets/galaxyBrush4.png')
    galaxyMix[4] = loadImage('assets/galaxyBrush5.png');
    galaxyMix[5] = loadImage('assets/galaxyBrush2.png');

    planets[0] = loadImage('assets/planetBrush1.png');
    planets[1] = loadImage('assets/planetBrush2.png');
    planets[2] = loadImage('assets/planetBrush5.png');
    planets[3] = loadImage('assets/planetBrush7.png');
    planets[4] = loadImage('assets/planetBrush10.png');
    planets[5] = loadImage('assets/planetBrush6.png');
    planets[6] = loadImage('assets/planetBrush9.png');

  }

function setup() {
    var canvas = createCanvas(900, 500);
    canvas.parent("p5container");
    background(0);
    frameRate(13);
    canvas.addClass('backStyle');

    nebulaSize = 200
    buttonPosition = 20
    var buttonRightPosition = 1120;

    // Buttons


     //Star Brush
    buttonStar = createButton("Star Brush");
    buttonStar.addClass('btn');
    buttonStar.position(buttonPosition, 200);
    buttonStar.mousePressed(()=>{
        starBrush = true;
        planetBrush = false;
        eraser = false;
        galaxyBrush = false;
        pen = false;
        starField = false;
        randomGalaxy = false;
        randomPlanet = false;
     });

     //Galaxy brush
    buttonGalaxy = createButton("Galaxy Brush");
    buttonGalaxy.addClass('btn');
    buttonGalaxy.position(buttonPosition, 150);
    buttonGalaxy.mousePressed(()=>{
        galaxyBrush = true;
        planetBrush = false;
        starBrush = false;
        eraser = false;
        pen = false;
        starField = false;
        randomGalaxy = false;
        randomPlanets = false;
     });


    // Planet brush
    buttonPlanet = createButton("Planet Brush");
    buttonPlanet.addClass('btn');
    buttonPlanet.position(buttonPosition, 250);
    buttonPlanet.mousePressed(()=>{
        planetBrush = true;
        starBrush = false;
        eraser = false;
        galaxyBrush = false;
        pen = false;
        starField = false;
        randomGalaxy = false;
        randomPlanets = false;
     });

    // Pen
    buttonPen = createButton("Pencil");
    buttonPen.addClass('btn');
    buttonPen.position(buttonPosition, 300);
    buttonPen.mousePressed(()=>{
        pen = true;
        planetBrush = false;
        starBrush = false;
        eraser = false;
        galaxyBrush = false;
        starField = false;
        randomGalaxy = false;
        randomPlanets = false;

     });

     // Clear button
    buttonStarField = createButton("Star Field");
    buttonStarField.addClass('btn');
    buttonStarField.position(buttonPosition, 350);
    buttonStarField.mousePressed(()=>{
    starField = true;
   });
     
     // Clear button
    buttonRandomGalaxy = createButton("Random Galaxy");
    buttonRandomGalaxy.addClass('btn');
    buttonRandomGalaxy.position(buttonPosition, 400);
    buttonRandomGalaxy.mousePressed(()=>{
    randomGalaxy = true;
    randomPlanets = false;
    starField = false;
   });

     
    // Random Planets
    buttonRandomPlanets = createButton("Random Planets");
    buttonRandomPlanets.addClass('btn');
    buttonRandomPlanets.position(buttonPosition, 450);
    buttonRandomPlanets.mousePressed(()=>{
    randomPlanets = true;
   });


    // Save button
    buttonSave = createButton("Save");
    buttonSave.addClass('btn');
    buttonSave.position(buttonPosition, 500);
    buttonSave.mousePressed(()=>{
        saveCanvas(test, 'jpg');
   });

       // Erase
       buttonErase = createButton("Eraser");
       buttonErase.addClass('btn');
       buttonErase.position(buttonPosition, 550);
       buttonErase.mousePressed(()=>{
           eraser = true;
           planetBrush = false;
           starBrush = false;
           galaxyBrush = false;
           pen = false;
           starField = false;
           randomGalaxy = false;
           randomPlanets = false;
        });

     // Clear button
     buttonClear = createButton("Clear button");
     buttonClear.addClass('btn');
     buttonClear.position(buttonPosition, 600);
     buttonClear.mousePressed(()=>{
         clearButton = true;
      });

      //Music 

      sel = createSelect();
      sel.option('No Music')
      sel.option('Clair de Lune');
      sel.option('Doctor Who Theme');
      sel.option('Star Trek Voyager');
      sel.changed(music);
      sel.addClass('musicDropdown');


      // Color picker and range

      if (pen === true) {
      slider = createSlider(0, 40, 5);
      } else if(planetBrush === true) {
      slider = createSlider(100, 1000, 200);
      } else {
      slider = createSlider(0, 40, 5);   
      }


      slider.addClass('sliderStyle');

      colorPicker = createColorPicker('#fffff');
      colorPicker.position(buttonRightPosition, 530); 
      colorPicker.addClass('penColor');

 }


function draw() {
    var randomBrush = int(random(0, 5));
    var randomBrush2 = int(random(0, 7));
    test = document.getElementById("myTextArea").value;

    //Clear button
    if(clearButton === true){
        background(0);
        clearButton = false;
        nebulaBrush = false;
        starBrush = false;
    }

    //Brushes
    if (mouseIsPressed) {
    let penSize = slider.value();

      if (eraser === true){
            stroke(0);
            strokeWeight(penSize);
            line(mouseX, mouseY, pmouseX, pmouseY);
      }

      if (planetBrush === true){  
      imageMode(CENTER);
      image(planets[randomBrush2], mouseX, mouseY, nebulaSize, nebulaSize);
    }
    console.log(randomBrush2)

    if (starField === true){
        
    for (var i=0; i <= 200; i = i + 1 ){
        var randomStar = random(10,25)
        var xPos = random(0, width); 
        var yPos = random(0, height); 
          image(glowStar,xPos,yPos,randomStar,randomStar);
          
      }
      starField = false; // executes only once when clicked
}

if (randomGalaxy === true){
   
    for (var i=0; i <= 4; i = i + 1 ){
        var xPos = random(-100, 1000); 
        var yPos = random(-100, height); 
        var randomG = int(random(0, 5));
        image(galaxyMix[randomG], xPos, yPos, nebulaSize, nebulaSize);
      }
      randomGalaxy = false;
}

if (randomPlanets === true){
   
    for (var i=0; i <= 4; i = i + 1 ){
        var xPos = random(-100, 1000); 
        var yPos = random(-100, height); 
        var randomP = int(random(0, 5));
        image(planets[randomP], xPos, yPos, nebulaSize, nebulaSize);
      }
      randomPlanets = false;
}

    if (galaxyBrush === true){
        imageMode(CENTER);
        image(galaxyMix[randomBrush], mouseX, mouseY, nebulaSize, nebulaSize);
      }

    if (starBrush === true){
        var randomStar = random(10,25)
        fill(255, 100);
        noStroke();

        image(glowStar, mouseX, mouseY, randomStar, randomStar);
        //ellipse(mouseX, mouseY, randomStar, randomStar);
        
      }

      if (pen === true){ 

        stroke(colorPicker.color());
        strokeWeight(penSize);
        line(mouseX, mouseY, pmouseX, pmouseY);
      }
  } 
}
    
    
function keyPressed(){
    // Key presses to increase size
    if(keyCode === UP_ARROW && nebulaSize <= 500){
        nebulaSize = nebulaSize + 100
    } else if(keyCode === DOWN_ARROW && nebulaSize >= 200){
        nebulaSize = nebulaSize - 100
    }

    if (key === 's' || key === 'S') {
        saveCanvas('My Galaxy Art', 'jpg');
      }

      if(keyCode === 32){
        mousePressed = true;
        starField = true;
        randomPlanets = true;
        randomGalaxy = true;
      } else {
          //do nothing
    }  
}

function music() {
    let musicChoice = sel.value();

    if (musicChoice === 'Doctor Who Theme'){ 
        doctorTheme.play();
        starTrek.stop();
        clairDeLune.stop();
    } else if (musicChoice === 'Star Trek Voyager') {
        doctorTheme.stop();
        clairDeLune.stop();
        starTrek.play();
    } else if (musicChoice === 'Clair de Lune') {
        clairDeLune.play();
        starTrek.stop(); 
        doctorTheme.stop();      
    } else if (musicChoice === 'No Music') {
        doctorTheme.stop();
        starTrek.stop();  
        clairDeLune.stop(); 
    }


}   
