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


//First solution, too brute-force.
function ProcessDayIncrement(fishArr)
{
    let newFish = [];
    for (let i in fishArr)
    {
        if (fishArr[i] < 1)
        {
            fishArr[i] = 6;
            newFish.push(8);
        }
        else
        {
            fishArr[i]--;
        }
    }
    return fishArr.concat(newFish);
}

//Second solution, less brute-force but still far too inefficient.
function GetFishDecendents(originalCount, dayCount)
{
    let firstBirth = dayCount-(originalCount);
    let fishTotal = 1;
    for (let i = firstBirth; i > 0; i-=7)
    {
        fishTotal += GetFishDecendents(8, i-1);
    }
    return fishTotal;
}

//Third solution, inspired by a sage called Azrael.
function AzraelsTheorem(fishes, dayCount)
{
    let ages = [0,0,0,0,0,0,0,0,0];
    for (let i in fishes)
    {
        ages[fishes[i]]++;
    }
    for (let d = 0; d < dayCount; d++)
    {
        let ogZero = ages[0];
        for (let i = 0; i < 8; i++)
        {
            ages[i] = ages[i+1];
        }
        ages[6] += ogZero;
        ages[8] = ogZero;
    }

    let fishTotal = 0;
    for (let i in ages)
    {
        fishTotal += ages[i];
    }
    return fishTotal;
}

const days = 256;
let fish = GetInitialFish();

let total = AzraelsTheorem(fish, days);

// let total = 0;

// for (let i in fish)
// {
//     console.log(`fish: ${i}; count: ${fish[i]}.`);
//     total += GetFishDecendents(fish[i], days);
// }


// for (let i = 0; i < days; i++)
// {
//     console.log(`day ${i+1}.`);
//     fish = ProcessDayIncrement(fish);
// }

console.log(`The fish population after ${days} days is ${total}.`);