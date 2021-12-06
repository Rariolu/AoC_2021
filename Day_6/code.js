const fs = require("fs");

const fsConfig = {encoding:"utf8",flag:"r"};

function GetInitialFish()
{
    let text = fs.readFileSync("input.txt",fsConfig);
    let numStrs = text.split(',');
    let nums = [];
    for (let i in numStrs)
    {
        nums.push(parseInt(numStrs[i]));
    }
    return nums;
}

function ProcessDayIncrement(fish)
{
    newFish = [];
    for (let i in fish)
    {
        if (fish[i] < 1)
        {
            fish[i] = 6;
            newFish.push(8);
        }
        else
        {
            fish[i]--;
        }
    }
    return fish.concat(newFish);
}

const days = 80;
let fish = GetInitialFish();
for (let i = 0; i < days; i++)
{
    fish = ProcessDayIncrement(fish);
}

console.log(`The fish population after ${days} days is ${fish.length}.`);