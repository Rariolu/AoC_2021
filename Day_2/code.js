const fs = require("fs");

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

function ProcessInstructionsPart2(insts)
{
    let x = 0;
    let y = 0;
    let dY = 0;
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
                y += dY * operand;
                break;
            }
            case "down":
            {
                dY += operand;
                break;
            }
            case "up":
            {
                dY -= operand;
                break;
            }
        }
    }
    return {horizontal:x, depth: y};
}

console.log("Part 1:");
let instructions = GetInstructions();
let finalPosition = ProcessInstructions(instructions);
console.log(`Final horizontal position is ${finalPosition.horizontal} and final depth is ${finalPosition.depth}.`);
console.log(`Multiplied is: ${finalPosition.depth * finalPosition.horizontal}.`);

console.log("\n...\nPart 2:");

let finalPosition2 = ProcessInstructionsPart2(instructions);
console.log(`Final horizontal position is ${finalPosition2.horizontal} and final depth is ${finalPosition2.depth}.`);
console.log(`Multiplied is: ${finalPosition2.depth * finalPosition2.horizontal}.`);