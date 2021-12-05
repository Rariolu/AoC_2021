#include <fstream>
#include <iostream>
#include <string>
#include <vector>

using string = std::string;

template <class T>
using vector = std::vector<T>;

struct Vec2
{
    Vec2(int _x, int _y)
    {
        x = _x;
        y = _y;
    }
    Vec2()
    {
        x = 0;
        y = 0;
    }
    Vec2 Add(Vec2 vec)
    {
        int newX = x + vec.x;
        int newY = y + vec.y;
        return Vec2(newX, newY);
    }
    bool operator !=(Vec2 vec)
    {
        return (x != vec.x) || (y != vec.y);
    }
    int x;
    int y;
};

struct Line
{
    Line(){}
    Line(Vec2 _start, Vec2 _end)
    {
        start = _start;
        end = _end;
    }
    bool IsHorizontal()
    {
        return start.y == end.y;
    }
    bool IsVertical()
    {
        return start.x == end.x;
    }
    bool IsDiagonal()
    {
        int xDiff = abs(end.x - start.x);
        int yDiff = abs(end.y - start.y);
        return xDiff == yDiff;
    }
    Vec2 start;
    Vec2 end;
};

vector<string> SplitString(string str, string delimeter)
{
    vector<string> splittedStrings = {};
    size_t pos = 0;

    while ((pos = str.find(delimeter)) != string::npos)
    {
        string token = str.substr(0, pos);
        if (token.length() > 0)
        {
            splittedStrings.push_back(token);
        }
        str.erase(0, pos + delimeter.length());
    }

    if (str.length() > 0)
    {
        splittedStrings.push_back(str);
    }
    return splittedStrings;
}

int maxX = 0;
int maxY = 0;

Vec2 ParseVec2(string str)
{
    vector<string> nums = SplitString(str, ",");
    if (nums.size() > 1)
    {
        int x = std::stoi(nums[0]);
        int y = std::stoi(nums[1]);
        if (x > maxX)
        {
            maxX = x;
        }
        if (y > maxY)
        {
            maxY = y;
        }
        return Vec2(x, y);
    }
    std::cout << "\"" << str << "\"" << " was not parsed." << std::endl;
    return Vec2();
}

Line ParseLine(string str)
{
    vector<string> segments = SplitString(str," -> ");
    if (segments.size() > 1)
    {
        Vec2 start = ParseVec2(segments[0]);
        Vec2 end = ParseVec2(segments[1]);
        return Line(start, end);
    }
    std::cout << "\"" << str << "\"" << " not parsed." << std::endl;
    return Line();
}

vector<Line> GetLines()
{
    vector<Line> lines;
    //std::ifstream file("testdata.txt");
    std::ifstream file("input.txt");
    if (file.is_open())
    {
        string line;
        while (std::getline(file, line))
        {
            lines.push_back(ParseLine(line));
        }
        file.close();
    }
    return lines;
}

void RetrieveDistincts(vector<Line> lines, vector<Line>& horizontals, vector<Line>& verticals, vector<Line>& diagonals)
{
    for(Line line : lines)
    {
        if (line.IsHorizontal())
        {
            horizontals.push_back(line);
        }
        if (line.IsVertical())
        {
            verticals.push_back(line);
        }
        if (line.IsDiagonal())
        {
            diagonals.push_back(line);
        }
    }
}

struct Grid
{
    Grid(int _width, int _height)
    {
        width = _width;
        height = _height;
        grid = new int*[width];
        for (int x = 0; x < width; x++)
        {
            grid[x] = new int[height];
            for (int y = 0; y < height; y++)
            {
                grid[x][y] = 0;
            }
        }
    }
    void PerformLine(Line line)
    {
        Vec2 grad;
        int mX = line.end.x - line.start.x;
        int mY = line.end.y - line.start.y;
        if (line.IsHorizontal())
        {
            grad.x = mX > 0 ? 1 : -1;
            // int startX;
            // int endX;
            // if (line.start.x < line.end.x)
            // {
            //     startX = line.start.x;
            //     endX = line.end.x;
            // }
            // else
            // {
            //     startX = line.end.x;
            //     endX = line.start.x;
            // }
            // for(int x = startX; x <= endX; x++)
            // {
            //     grid[x][line.start.y]++;
            // }
        }
        else if (line.IsVertical())
        {
            grad.y = mY > 0 ? 1 : -1;
            // int startY;
            // int endY;
            // if (line.start.y < line.end.y)
            // {
            //     startY = line.start.y;
            //     endY = line.end.y;
            // }
            // else
            // {
            //     startY = line.end.y;
            //     endY = line.start.y;
            // }
            // for(int y = startY; y <= endY; y++)
            // {
            //     grid[line.start.x][y]++;
            // }
        }
        else if (line.IsDiagonal())
        {
            grad.x = mX > 0 ? 1 : -1;
            grad.y = mY > 0 ? 1 : -1;
            // int mX = line.end.x - line.start.x;
            // int gradX = mX > 0 ? 1 : -1;

            // int mY = line.end.y - line.start.y;
            // int gradY = mY > 0 ? 1 : -1;


        }
        for (Vec2 i = line.start; i != line.end.Add(grad); i = i.Add(grad))
        {
            //std::cout << "("<<i.x<<","<<i.y<<std::endl;
            grid[i.x][i.y]++;
        }
    }
    int TotalOverlap()
    {
        int total = 0;
        for (int x = 0; x < width; x++)
        {
            for (int y = 0; y < height; y++)
            {
                if (grid[x][y] > 1)
                {
                    total++;
                }
            }
        }
        return total;
    }

    void PrintGrid()
    {
        for (int y = 0; y < height; y++)
        {
            for (int x = 0; x < width; x++)
            {
                std::cout << grid[x][y];
            }
            std::cout << "\n";
        }
    }
    int width;
    int height;
    int** grid;
};

int main()
{
    vector<Line> lines = GetLines();
    vector<Line> horizontals;
    vector<Line> verticals;
    vector<Line> diagonals;
    RetrieveDistincts(lines, horizontals, verticals, diagonals);
    
    std::cout << "Horz: "<<horizontals.size()<<"; Vertz: "<<verticals.size()<<"; Diags: "<<diagonals.size()<<std::endl;
    std::cout << "Line count: "<<lines.size()<<std::endl;
    std::cout << "Max X: "<<maxX<<"; Max Y: "<<maxY<<";"<<std::endl;
    
    Grid grid = Grid(maxX+1, maxY+1);
    for(Line horz : horizontals)
    {
        grid.PerformLine(horz);
    }
    std::cout << "Completed horizontals"<<std::endl;
    for (Line vert : verticals)
    {
        grid.PerformLine(vert);
    }
    std::cout << "completed Verticals"<<std::endl;
    for (Line diag : diagonals)
    {
        grid.PerformLine(diag);
    }
    std::cout << "Completed diagonals"<<std::endl;

    std::cout << "Total overlap using only horizontal and vertical lines is: "<<grid.TotalOverlap()<<std::endl;
    
    //grid.PrintGrid();
    
    return 0;
}