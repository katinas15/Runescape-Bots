var robot = require("robotjs");

let timeoutNodeOne = 1500
let timeoutNodeTwo = 2000
let deltaNodeOne = 25
let deltaNodeTwo = 70

let nodes = [
    { x: 712, y: 607 },
    { x: 927, y: 830 },
    { x: 1175, y: 628 }
]


// let nodes = [
//     { x: 614, y: 591 },
//     { x: 807, y: 809 },
//     { x: 1041, y: 609 }
// ]


let timeoutInvOne = 200
let timeoutInvTwo = 400
let invDeltaOne = 5
let invDeltaTwo = 10

let invDrop = [
    { x: 1716, y: 760 },
    { x: 1759, y: 759 },
    { x: 1804, y: 759 }
]

// let invDrop = [
//     { x: 1480, y: 722 },
//     { x: 1523, y: 717 },
//     { x: 1562, y: 719 }
// ]

let mouseRandomMove = 5
let mouseSpeed = 4


console.log('Starting')
function start(){
    while(true){
        sleep(getRndInteger(timeoutNodeOne, timeoutNodeTwo))
        sleep(1000)
        if(getRndInteger(1,10) > 9) shuffle(nodes)

        for(let i = 0; i<nodes.length; i++){
            if(getRndInteger(1,100) > 91) continue
            console.log('Node - ' + i)
            let node = nodes[i]
            let x = node.x + getRndInteger(deltaNodeOne, deltaNodeTwo) * (Math.random() < 0.5 ? -1 : 1);
            let y = node.y + getRndInteger(deltaNodeOne, deltaNodeTwo) * (Math.random() < 0.5 ? -1 : 1);
            if(getRndInteger(1,100) > 5) smoothAction(x, y)
            sleep(getRndInteger(timeoutNodeOne, timeoutNodeTwo))
        }

        robot.keyToggle('shift', 'down')
        sleep(getRndInteger(timeoutInvOne, timeoutInvTwo))
        if(getRndInteger(1,10) > 9) shuffle(invDrop)
        for(let i = 0; i<invDrop.length; i++){
            if(getRndInteger(1,100) > 98) continue
            console.log('Inv - ' + i)
            let node = invDrop[i]
            let x = node.x + getRndInteger(invDeltaOne, invDeltaTwo) * (Math.random() < 0.5 ? -1 : 1);
            let y = node.y + getRndInteger(invDeltaOne, invDeltaTwo) * (Math.random() < 0.5 ? -1 : 1);
            if(getRndInteger(1,100) > 4) smoothAction(x, y)
            sleep(getRndInteger(timeoutInvOne, timeoutInvTwo))
        }
        robot.keyToggle('shift', 'up')
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
        robot.setMouseDelay(getRndInteger(1, mouseSpeed));
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
        robot.mouseClick()
        resolve()
    })
   
}

function sleep(n){
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// GET MOUSE POS
setTimeout(function(){ 
    start()
}, 5000);

