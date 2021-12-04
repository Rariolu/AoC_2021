const { timeStamp } = require("console");
const fs = require("fs");
const fsConfig = {encoding:"utf8",flag:"r"};

class Board
{
    constructor(arr)
    {
        this.cells = [];
        this.hasWon = false;
        for(let i in arr)
        {
            let line = arr[i];

            let lineCells = [];

            line = line.replace(/ {2}/g, " ").trimStart();

            let numStrs = line.split(" ");
            for(let j in numStrs)
            {
                let obj = {num: numStrs[j], marked: false};
                lineCells.push(obj);
                if (j == 5)
                {
                    console.log(`5 detected, numStrs: ${numStrs};`);
                }
            }
            this.cells.push(lineCells);
        }
    }

    CheckNumberForWin(num)
    {
        for (let y in this.cells)
        {
            for (let x in this.cells[y])
            {
                if (this.cells[y][x].num == num)
                {
                    this.cells[y][x].marked = true;
                    if (this.CheckRowAndColumn(x,y))
                    {
                        this.hasWon = true;
                        return true;
                    }
                    break;
                }
            }
        }
        return false;
    }

    CheckRowAndColumn(x, y)
    {
        let rowBroken = false;
        let columnBroken = false;
        for (let i = 0; i < 5 && !(rowBroken && columnBroken); i++)
        {
            if (!this.cells[y][i].marked)
            {
                columnBroken = true;
            }
            if (!this.cells[i][x].marked)
            {
                rowBroken = true;
            }
        }
        return !rowBroken || !columnBroken;
    }
    UnMarkedSum()
    {
        let sum = 0;
        for (let y in this.cells)
        {
            for (let x in this.cells[y])
            {
                if (!this.cells[y][x].marked)
                {
                    sum += parseInt(this.cells[y][x].num);
                }
            }
        }
        return sum;
    }
    Reset()
    {
        this.hasWon = false;
        for (let y in this.cells)
        {
            for (let x in this.cells[y])
            {
                this.cells[y][x].marked = false;
            }
        }
    }
}

class Config
{
    constructor(drawn, bingoBoards)
    {
        this.drawn = drawn;
        this.bingoBoards = bingoBoards;
    }
    Reset()
    {
        for (let i in this.bingoBoards)
        {
            this.bingoBoards[i].Reset();
        }
    }
}

function GetConfig()
{
    let text = fs.readFileSync("input.txt",fsConfig);
    let lines = text.replace(/\r\n/g,'\n').split('\n');

    let numStrs = lines[0].split(',');

    let boards = [];

    for(let i = 2; i < lines.length-5; i += 6)
    {
        let boardArr = [];
        for (let j = 0; j < 5; j++)
        {
            boardArr.push(lines[i+j]);
        }
        boards.push(new Board(boardArr));
    }

    return new Config(numStrs, boards);
}

function GetWinningBoardAndNumber(config)
{
    for (let i in config.drawn)
    {
        for (let j in config.bingoBoards)
        {
            if (config.bingoBoards[j].CheckNumberForWin(config.drawn[i]))
            {
                return {board: config.bingoBoards[j], number: config.drawn[i]};
            }
        }
    }
    return null;
}

function GetLastWinnerAndNumber(config)
{
    let winners = 0;
    for (let i in config.drawn)
    {
        for (let j in config.bingoBoards)
        {
            if (config.bingoBoards[j].hasWon)
            {
                continue;
            }
            if (config.bingoBoards[j].CheckNumberForWin(config.drawn[i]))
            {
                if (winners >= config.bingoBoards.length-1)
                {
                    console.log(`Last winner found.`);
                    return {board: config.bingoBoards[j], number: config.drawn[i]};
                }
                else
                {
                    winners++;
                }
            }
        }
    }
    console.log(`config.bingoBoards.length: ${config.bingoBoards.length}; winners: ${winners}`);
    return null;
}

let boardConfig = GetConfig();
let winner = GetWinningBoardAndNumber(boardConfig);

let unMarkedSum = winner.board.UnMarkedSum();
let finalScore = unMarkedSum * winner.number;

console.log(`Final score is ${finalScore}`);

boardConfig.Reset();

let lastWinner = GetLastWinnerAndNumber(boardConfig);

let lastUnMarkedSum = lastWinner.board.UnMarkedSum();
let lastFinalScore = lastUnMarkedSum * lastWinner.number;

console.log(`Last final score is ${lastFinalScore}.`);