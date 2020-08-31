var robot = require("robotjs");

let mouseDelayOne = 1
let mouseDelayTwo = 3

let timeoutNodeOne = 1000
let timeoutNodeTwo = 2000
let deltaNodeOne = 25
let deltaNodeTwo = 10
let nodes = [
    { x: 614, y: 591 },
    { x: 807, y: 809 },
    { x: 1041, y: 609 }
]

let timeoutInvOne = 200
let timeoutInvTwo = 400
let invDeltaOne = 10
let invDeltaTwo = 5
let invDrop = [
    { x: 1480, y: 722 },
    { x: 1523, y: 717 },
    { x: 1562, y: 719 }
]

let mouseRandomMove = 5
let mouseSpeed = 10


console.log('Starting')
function start(){
    while(true){
        sleep(getRndInteger(timeoutNodeOne, timeoutNodeTwo))
        for(let i = 0; i<nodes.length; i++){
            console.log('Node - ' + i)
            let node = nodes[i]
            smoothAction(node.x, node.y)
            sleep(getRndInteger(timeoutNodeOne, timeoutNodeTwo))
        }
    }
}



function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


async function smoothAction(x, y){
    return new Promise(resolve => {
        console.log('MOVING MOUSE')
        let mouse = robot.getMousePos()
        console.log(mouse)
        robot.setMouseDelay(2);
        while(mouse.x != x || mouse.y != y){
            mouse = robot.getMousePos()
            let move1 = getRndInteger(1, mouseRandomMove)
            let move2 = getRndInteger(1, mouseRandomMove)
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
        resolve()
    })
   
}

function sleep(n){
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

// GET MOUSE POS
setTimeout(function(){ 
    start()
}, 5000);

