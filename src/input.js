var keys = {
    left: 37,
    right: 39,
    up: 38,
    down: 40,
    a: 65,
    s: 83,
    d: 68,
    f: 70,
    z: 90,
    q: 81,
    space: 32,
    shift: 16,
    control: 17,
    x: 88,
};

var keyState, triggerKeyState;

// This is for the title screen initial key press tracking.
var initialKeyPress;

function configureInput() {
    keyState = {};
    triggerKeyState = {};
    _.keys(keys).forEach(function(key) {
        keyState[key] = false; 
        triggerKeyState[key] = false; 
    });
}

var keyPressed = function(e) {
    if (!initialKeyPress) {
        initialKeyPress = true;
        return;
    }
    var key = _.findKey(keys, function(x) {
        return x == e.keyCode;
    });
    if (key) {
        if (!keyState[key]) {
            triggerKeyState[key] = true;
        }
        keyState[key] = true;
        e.preventDefault();
    }
    else {
        console.log('Pressed ' + e.keyCode);
    }
};

var keyReleased = function(e) {
    var key = _.findKey(keys, function(x) {
        return x == e.keyCode;
    });
    if (key) {
        keyState[key] = false;
    }
    else {
        console.log('Released ' + e.keyCode);
    }
};

function updateInput() {
    _.keys(keys).forEach(function(key) {
        triggerKeyState[key] = false; 
    });
}
