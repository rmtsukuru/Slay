var mainLoop;
var player;
var currentMap;

var minimapEnabled = false;

window.onload = function() {
    configureGraphics();
    configureInput();
    configureAudio();
    resetGame();
    scene = new TitleScene();

    mainLoop = function() {
        scene.update();
        scene.draw();
    };
    
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    window.setInterval(mainLoop, 1000 / FPS);
};
