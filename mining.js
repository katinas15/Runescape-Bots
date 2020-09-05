const robot = require("robotjs");
const {getRndInteger, smoothAction, sleep, shuffle} = require('./basic.js')

let timeoutNodeOne = 1600
let timeoutNodeTwo = 2000
let deltaNodeOne = 0
let deltaNodeTwo = 50

// let nodes = [
//     { x: 712, y: 607 },
//     { x: 927, y: 830 },
//     { x: 1175, y: 628 }
// ]


let nodes = [
    { x: 614, y: 591 },
    { x: 807, y: 809 },
    { x: 1041, y: 609 }
]


let timeoutInvOne = 100
let timeoutInvTwo = 200
let invDeltaOne = 0
let invDeltaTwo = 10

// let invDrop = [
//     { x: 1716, y: 760 },
//     { x: 1759, y: 759 },
//     { x: 1804, y: 759 }
// ]

let invDrop = [
    { x: 1480, y: 722 },
    { x: 1523, y: 717 },
    { x: 1562, y: 719 }
]


console.log('Starting')
async function start(){
    while(true){
        sleep(getRndInteger(timeoutNodeOne, timeoutNodeTwo))
        if(getRndInteger(1,10) > 9) shuffle(nodes)

        for(let i = 0; i<nodes.length; i++){
            if(getRndInteger(1,100) > 91) continue
            console.log('Node - ' + i)
            let node = nodes[i]
            let x = node.x + getRndInteger(deltaNodeOne, deltaNodeTwo) * (Math.random() < 0.5 ? -1 : 1);
            let y = node.y + getRndInteger(deltaNodeOne, deltaNodeTwo) * (Math.random() < 0.5 ? -1 : 1);
            if(getRndInteger(1,100) > 5) await smoothAction(x, y)
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
        robot.keyToggle('shift', 'down')
    }
}



// GET MOUSE POS
setTimeout(function(){ 
    start()
}, 5000);

