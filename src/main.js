var mainLoop;
var player;
var currentMap;

var minimapEnabled = false;

window.onload = function() {
    player = new Player(300, 200); 
    entities.push(player);
    configureGraphics(player);
    configureInput();
    configureAudio();
    configureGame();
    scene = new TitleScene();

    for (var i = 0; i < FPS; i++) {
        update();
    }

    mainLoop = function() {
        scene.update();
        scene.draw();
    };
    
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    window.setInterval(mainLoop, 1000 / FPS);
};
