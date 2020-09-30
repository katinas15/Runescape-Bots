const robot = require("robotjs");
const {getRndInteger, sleep, smoothAction} = require('./basic.js')
const {dropInventory} = require('./advanced')


let clickPosition
let InvPos = { x: 710, y: 515 }
const inventorySpaces = 28

let timeoutOne = 776
let timeoutTwo = 942

async function start(){
    console.log('STARTED')
    clickPosition = robot.getMousePos()
    while(true){
        await smoothAction(clickPosition.x, clickPosition.y)
        for(let i = 0; i<inventorySpaces;i++){
            sleep(getRndInteger(timeoutOne, timeoutTwo))
            if(getRndInteger(1,10) > 9) robot.mouseClick()
            sleep(getRndInteger(timeoutOne, timeoutTwo))
            smoothAction(clickPosition.x, clickPosition.y)
            sleep(getRndInteger(timeoutOne, timeoutTwo))
            if(getRndInteger(1,10) > 9) robot.mouseClick()
            sleep(getRndInteger(timeoutOne, timeoutTwo))

        }
        await dropInventory(InvPos.x, InvPos.y)
    }


}

setTimeout(function(){ 
    start()
}, 5000);
