const robot = require("robotjs");

let mouseRandomMove = 10
let mouseSpeed = 10

exports.getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


exports.smoothAction = async (x, y) => {
    return new Promise(resolve => {
        console.log(x, y)
        console.log('MOVING MOUSE')
        let mouse = robot.getMousePos()
        console.log(mouse)
        robot.setMouseDelay(this.getRndInteger(1, mouseSpeed/2));
        while(mouse.x != x || mouse.y != y){
            mouse = robot.getMousePos()
            let move1 = this.getRndInteger(1, mouseRandomMove)
            let move2 = this.getRndInteger(1, mouseRandomMove)
            let xAdd = x > mouse.x
            let yAdd = y > mouse.y
            if(mouse.x != x || mouse.y != y){
                if(xAdd && yAdd){
                    robot.moveMouse(mouse.x + move1, mouse.y + move2);
                } else if (xAdd && !yAdd){
                    robot.moveMouse(mouse.x + move1, mouse.y - move2);
                } else if (!xAdd && yAdd){
                    robot.moveMouse(mouse.x - move1, mouse.y + move2);
                } else if(!xAdd && !yAdd){
                    robot.moveMouse(mouse.x - move1, mouse.y - move2);
                }
            }
        }
        robot.mouseClick()
        resolve()
    })
   
}

exports.sleep = (n) => {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

exports.shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}