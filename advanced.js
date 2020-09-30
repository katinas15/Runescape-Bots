const robot = require("robotjs");
const {getRndInteger, smoothAction, sleep} = require('./basic.js')
const inventorySpaces = 28

const offset = 38

exports.dropInventory = async (x,y) => {
    const rows = 7
    const cols = 4
    let t1 = 115
    let t2 = 234
    let invPos = []
    let loc
    for(let i = 0;i<rows;i++){
        for(let o = 0;o<cols;o++){
            loc = {y: y + offset*i, x: x + offset*o}
            console.log(loc)
            invPos.push(loc)
        }
    }



	robot.keyToggle('shift', 'down')
    for(let i in invPos){
        sleep(getRndInteger(t1,t2))
        let pos = invPos[i]
        console.log('DROPPING')
        console.log(pos)
        await smoothAction(pos.x, pos.y)
        sleep(getRndInteger(t1,t2))
    }
	robot.keyToggle('shift', 'up')
    
}
