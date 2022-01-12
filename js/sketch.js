// global variables
var colorPicker, brushSize, glowStar, btnMusic, colorPicker, starX, starY, width, height;

// set variables to false
var [
    starWalker,
    planetBrush,
    clearButton,
    starBrush,
    eraser,
    pen,
    galaxyBrush,
    randomGalaxy,
    starField,
    randomPlanets,
    tardis,
] = Array(11).fill(false);

// arrays
let galaxyMix = [];
let planets = [];

// for starField
const starCount = 200;

function preload() {

    //preload music 
    doctorTheme = loadSound('assets/music/doctorWho.mp3');
    starTrek = loadSound('assets/music/starTrek.mp3')
    clairDeLune = loadSound('assets/music/clairDeLune.mp3')

    //preload images
    glowStar = loadImage('assets/glowStar.png');

    for (let brushNum = 0; brushNum < 6; brushNum++) {
        var galaxyFile = 'assets/galaxy/brushG' + brushNum + '.png';
        galaxyMix[brushNum] = loadImage(galaxyFile);

        var planetsFile = 'assets/planets/brushP' + brushNum + '.png';
        planets[brushNum] = loadImage(planetsFile);
    }

}

function setup() {

    // Canvas setup
    var canvas = createCanvas(900, 500);
    canvas.parent("p5container");
    canvas.addClass('canvasGlow');
    background(0);
    frameRate(10);

    // Brush propetites
    brushSize = 170;

    // Star Walker positioning
    starX = width / 2;
    starY = height / 2;

    // Left buttons
    btnStar = createButton("Star Brush");
    btnStar.mousePressed(() => {
        starBrush = true;
        eraser = galaxyBrush = pen = planetBrush = randomGalaxy = randomPlanets = starField = tardis = false;
    });

    btnGalaxy = createButton("Galaxy Brush");
    btnGalaxy.mousePressed(() => {
        galaxyBrush = true;
        eraser = pen = planetBrush = randomGalaxy = randomPlanets = starBrush = starField = tardis = false;
    });

    btnPlanet = createButton("Planet Brush");
    btnPlanet.mousePressed(() => {
        planetBrush = true;
        eraser = galaxyBrush = pen = randomGalaxy = randomPlanets = starBrush = starField = tardis = false;
    });

    btnPen = createButton("Pen");
    btnPen.mousePressed(() => {
        pen = true;
        eraser = galaxyBrush = planetBrush = randomGalaxy = randomPlanets = starBrush = starField = tardis = false;
        colorPicker.show();
    });


    btnStarField = createButton("Star Field");
    btnStarField.mousePressed(() => {
        starField = true;
        eraser = galaxyBrush = pen = planetBrush = randomGalaxy = randomPlanets = starBrush = tardis = false;
    });

    btnRandomGalaxy = createButton("Random Galaxy");
    btnRandomGalaxy.mousePressed(() => {
        randomGalaxy = true;
        eraser = galaxyBrush = pen = planetBrush = randomPlanets = starBrush = tardis = false;
    });

    btnRandomPlanets = createButton("Random Planets");
    btnRandomPlanets.mousePressed(() => {
        randomPlanets = true;
        eraser = galaxyBrush = pen = planetBrush = randomGalaxy = starBrush = tardis = false;
    });

    btnErase = createButton("Eraser");
    btnErase.mousePressed(() => {
        eraser = true;
        galaxyBrush = pen = planetBrush = randomGalaxy = randomPlanets = starBrush = starField = tardis = false;
    });

    btnClear = createButton("Clear");
    btnClear.mousePressed(() => {
        clearButton = true;
        galaxyBrush = pen = planetBrush = randomGalaxy = randomPlanets = starBrush = starField = tardis = false;
    });

    // Array of the left column buttons
    // This adds the class 'btn' and parent 'leftbar' to all buttons
    let buttonsLeft = [btnStar, btnGalaxy, btnPlanet,
        btnPen, btnStarField, btnRandomGalaxy, btnRandomPlanets, btnErase, btnClear
    ]

    for (i = 0; i < 9; i++) {
        var buttonName = buttonsLeft[i];
        buttonName.addClass('btn');
        buttonName.parent('leftbar');
    }

    // Right column buttons

    btnSave = createButton("Save");
    btnSave.mousePressed(() => {
        // uses the P5 saveCanvas function to download an image of the canvas 
        saveCanvas(document.getElementById("galaxyName").value, 'jpg');
    });

    btnMusic = createSelect(); // music dropdown 
    btnMusic.option('No Music')
    btnMusic.option('Clair de Lune');
    btnMusic.option('Doctor Who Theme');
    btnMusic.option('Star Trek Voyager');
    btnMusic.changed(music);

    btnTardis = createButton("Add TARDIS");
    btnTardis.mousePressed(() => {
        tardis = true;
        eraser = galaxyBrush = pen = planetBrush = randomGalaxy =
            randomPlanets = starBrush = starField = false;
    });

    btnRandomize = createButton("Randomize");
    btnRandomize.mousePressed(() => {
        background(0); // resets background
        randomPlanets = randomGalaxy = starField = true;
        pen = eraser = tardis = false;
    });

    btnStarWalker = createButton("Star Walker");
    btnStarWalker.mousePressed(() => {
        starWalker = true;
        btnStarWalkerStop.show();

    });

    // Array of the right column buttons
    let buttonsRight = [btnSave, btnMusic, btnTardis, btnRandomize, btnStarWalker]

    for (i = 0; i < 5; i++) {
        var buttonName = buttonsRight[i];
        buttonName.addClass('btn');
        buttonName.parent('rightbar');
    }

    // Sliders for drawing tools e.g. pen (sliderD) and brushes e.g. planets (sliderB)

    sliderD = createSlider(1, 50, 10);
    sliderD.addClass('sliderStyle');
    sliderD.parent('rightbar');
    sliderD.hide();

    sliderB = createSlider(100, 500, brushSize);
    sliderB.addClass('sliderStyle');
    sliderB.parent('rightbar');
    sliderB.hide();


    // Color picker
    colorPicker = createColorPicker('#fffff');
    colorPicker.parent('rightbar');
    colorPicker.addClass('penColor');
    colorPicker.hide();

    // Stop button for Stalk Walker
    btnStarWalkerStop = createButton("Stop");
    btnStarWalkerStop.parent('rightbar');
    btnStarWalkerStop.addClass('btnStop');
    btnStarWalkerStop.mousePressed(() => {
        starWalker = false;
        btnStarWalkerStop.hide();

    });
    btnStarWalkerStop.hide(); // hides button once clicked

}


function draw() {
    // document title updates depending on text area
    document.title = 'Artwork: ' + document.getElementById('galaxyName').value;

    // chooses a random integer for choosing a random brush 
    var randomBrush = int(random(0, 6));


    //Brushes

    if (mouseIsPressed) {
        // hides the color picker and slider by default
        colorPicker.hide();
        sliderD.hide();
        sliderB.hide();

        penSize = sliderD.value();
        brushSize = sliderB.value();
        frameRate(10);

        // Star Brush - creates stars on the canvas
        if (starBrush === true) {
            var randomStar = random(10, 25); // random star size
            image(glowStar, mouseX, mouseY, randomStar, randomStar);

            // Galaxy Brush - creates nebulas & galaxies on the canvas
        } else if (galaxyBrush === true) {
            sliderB.show();
            imageMode(CENTER);
            image(galaxyMix[randomBrush], mouseX, mouseY, brushSize, brushSize);

            // Planet Brush - creates planets on the canvas
        } else if (planetBrush === true) {
            sliderB.show();
            imageMode(CENTER);
            image(planets[randomBrush], mouseX, mouseY, brushSize, brushSize);

            // Eraser - uses a black line to erase the canvas
        } else if (eraser === true) {
            sliderD.show();
            stroke(0);
            strokeWeight(penSize);
            line(mouseX, mouseY, pmouseX, pmouseY);

            // Pen tool - for drawing on the canvas
        } else if (pen === true) {
            frameRate(60); // for smoother drawing
            colorPicker.show();
            sliderD.show();

            stroke(colorPicker.color());
            strokeWeight(penSize);
            line(mouseX, mouseY, pmouseX, pmouseY);

            // TARDIS - generates a tardis in middle of canvas
        } else if (tardis === true) {
            noStroke();
            drawTardis(); // executes drawTardis function
        }
    }

    // Star Field - generates 200 random stars on the canvas
    if (starField === true) {
        for (let i = 0; i <= starCount; i++) {
            var randomStar = random(10, 25)
            var xPos = random(0, width);
            var yPos = random(0, height);
            image(glowStar, xPos, yPos, randomStar, randomStar);
        }
        starField = false; //executes once per click
    }


    // Random Galaxy - generates random galaxies on the canvas
    if (randomGalaxy === true) {
        for (var i = 0; i <= 4; i = i + 1) {
            var xPos = random(-100, 1000);
            var yPos = random(-100, height);
            var randomG = int(random(0, 6));
            var galaxySize = random(100, 400);
            image(galaxyMix[randomG], xPos, yPos, galaxySize, galaxySize);
        }
        randomGalaxy = false; //executes once per click
    }

    // Random Planets - generates random planets on the canvas
    if (randomPlanets === true) {
        for (var i = 0; i <= 4; i = i + 1) {
            var xPos = random(-30, width);
            var yPos = random(-30, height);
            var planetSize = random(100, 200);
            var randomP = int(random(0, 5));
            image(planets[randomP], xPos, yPos, planetSize, planetSize);
        }
        randomPlanets = false; // executes once per click
    }


    // Star Walker - a star is created that moves in a random direction
    if (starWalker === true) {
        frameRate(10);

        // variables - value and the number of steps
        var randVal = random(0, 10);
        var starSteps = random(10, 50);

        // the movement of the Star Walker
        if (randVal < 2.5) {
            starX += starSteps;
        } else if (randVal < 5) {
            starX -= starSteps
        } else if (randVal < 7.5) {
            starY += starSteps
        } else {
            starY -= starSteps
        }

        // Stops walker from going out of the canvas
        if (starX > width - 20) {
            starX -= starSteps;
        } else if (starX < 20) {
            starX += starSteps;
        } else if (starY > height - 20) {
            starY -= starSteps;
        } else if (starY < 20) {
            starY += starSteps;
        }

        // Star walker
        image(glowStar, starX, starY, 15, 15);
    }

    // Clear button - uses background to clear the canvas
    if (clearButton === true) {
        background(0);
        clearButton = false;
        nebulaBrush = false;
        starBrush = false;
        tardis = false;
    }

}


function keyPressed() {

    // Clicking enter as a shortcut to randomize
    if (keyCode === 13) {
        background(0);
        randomGalaxy = true;
        starField = true;
        randomPlanets = true;

        colorPicker.hide();
        sliderB.hide();
        sliiderD.hide();
    }
}

function drawTardis() {
    // TARDIS P5 code - executed when btnTardis is clicked

    //changing rotation and scale
    scale(0.5);
    angleMode(DEGREES);
    rotate(15);

    //tardis variables
    var tardisX = 850;
    var tardisY = 25;
    var tardisWidth = 250;
    var tardisHeight = 500;

    fill(67, 97, 131);
    rect(tardisX, tardisY, tardisWidth, tardisHeight);

    //tardis blue background
    strokeWeight(4);
    stroke(0);
    fill(60, 59, 65);
    rect(tardisX + 20, tardisY + 20, 210, 40);

    //police box text
    noStroke();
    textFont('Century Gothic');
    fill(255);
    textSize(20);
    text('POLICE', tardisX + 30, tardisY + 45);

    textSize(20);
    text('BOX', tardisX + 170, tardisY + 45);

    //public call text
    fill(255);
    textSize(12);
    text('PUBLIC', tardisX + 110, tardisY + 40);
    text('CALL', tardisX + 115, tardisY + 50);

    //black doors
    noFill();
    strokeWeight(4);
    stroke(0);

    rect(tardisX + 20, tardisY + 20, tardisWidth - 40, tardisHeight - 20);
    rect(tardisX + 120, tardisY + 60, tardisWidth / 30, tardisHeight - 60);

    //right window 

    fill(255);
    rect(tardisX + 40, tardisY + 80, tardisWidth / 4, tardisHeight / 4);

    noFill();
    rect(tardisX + 40, tardisY + 80, tardisWidth / 8, tardisHeight / 4);
    rect(tardisX + 40, tardisY + 80, tardisWidth / 4, tardisHeight / 8);

    //left window

    fill(255);
    rect(tardisX + 150, tardisY + 80, tardisWidth / 4, tardisHeight / 4);

    noFill();
    rect(tardisX + 150, tardisY + 80, tardisWidth / 8, tardisHeight / 4);
    rect(tardisX + 150, tardisY + 80, tardisWidth / 4, tardisHeight / 8);

    //other blocks
    rect(tardisX + 40, tardisY + 220, tardisWidth / 4, tardisHeight / 4);
    rect(tardisX + 150, tardisY + 220, tardisWidth / 4, tardisHeight / 4);


    rect(tardisX + 150, tardisY + 360, tardisWidth / 4, tardisHeight / 4);
    rect(tardisX + 40, tardisY + 360, tardisWidth / 4, tardisHeight / 4);


    //top bars
    fill(67, 97, 131);
    rect(tardisX + 20, tardisY - 23, tardisWidth - 40, tardisHeight / 22);

    //bottom bar
    rect(tardisX - 20, tardisY + 500, tardisWidth + 40, tardisHeight / 22);

    //signal
    rect(tardisX + 110, tardisY - 47, tardisWidth - 220, tardisHeight / 22);

}


function music() {
    // Music - executed depending on dropdown 
    let musicChoice = btnMusic.value();

    if (musicChoice === 'Doctor Who Theme') {
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
