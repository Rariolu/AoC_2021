const fs = require("fs");
const internal = require("stream");

const fsConfig = {encoding:"utf8",flag:"r"};

function GetInstructions()
{
    let text = fs.readFileSync("input.txt",fsConfig);
    let lines = text.replace(/\r\n/g,'\n').split('\n');
    return lines;
}

function ProcessInstructions(insts)
{
    let x = 0;
    let y = 0;
    for (let i in insts)
    {
        let inst = insts[i];
        let components = inst.split(' ');
        let operator = components[0];
        let operand = parseInt(components[1]);
        switch(operator)
        {
            case "forward":
            {
                x += operand;
                break;
            }
            case "down":
            {
                y += operand;
                break;
            }
            case "up":
            {
                y -= operand;
                break;
            }
        }
    }
    return {horizontal: x, depth: y};
}

let instructions = GetInstructions();
let finalPosition = ProcessInstructions(instructions);
console.log(`Final horizontal position is ${finalPosition.horizontal} and final depth is ${finalPosition.depth}.`);
console.log(`Multiplied is: ${finalPosition.depth * finalPosition.horizontal}.`);