#include <fstream>
#include <iostream>
#include <map>
#include <math.h>
#include <sstream>
#include <string>
#include <vector>

template<typename T, typename U>
using map = std::map<T, U>;

using string = std::string;

template <class T>
using vector = std::vector<T>;

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

vector<int> GetCrabPositions()
{
    vector<int> crabs;

    //std::ifstream file("testdata.txt");
    std::ifstream file("input.txt");
    if (file.is_open())
    {
        std::stringstream buffer;
        buffer << file.rdbuf();
        string text = buffer.str();

        vector<string> numStrs = SplitString(text, ",");
        for (string numStr : numStrs)
        {
            crabs.push_back(std::stoi(numStr));
        }
    }

    return crabs;
}

vector<int> Merge(vector<int> listA, vector<int> listB)
{
    int i = 0;
    int j = 0;
    vector<int> merged;
    while (i < listA.size() && j < listB.size())
    {
        if (listA[i] < listB[j])
        {
            merged.push_back(listA[i]);
            i++;
        }
        else
        {
            merged.push_back(listB[j]);
            j++;
        }
    }
    while (i < listA.size())
    {
        merged.push_back(listA[i]);
        i++;
    }
    while(j < listB.size())
    {
        merged.push_back(listB[j]);
        j++;
    }
    return merged;
}

vector<int> MergeSort(vector<int> list)
{
    if (list.size() <= 1)
    {
        return list;
    }
    int half = list.size() / 2;

    vector<int> left;
    vector<int> right;

    left.assign(list.begin(), list.begin() + half);
    right.assign(list.begin() + half, list.end());

    left = MergeSort(left);
    right = MergeSort(right);

    return Merge(left, right);
}

float Median(vector<int> list)
{
    vector<int> sortedList = MergeSort(list);

    int length = sortedList.size();

    if (length % 2 == 0)
    {
        return (sortedList[length/2] + sortedList[(length-1)/2]) / 2.f;
    }
    return sortedList[length/2];
}

int CalculateMigrationCost(vector<int> crabs, int target)
{
    int fuelCost = 0;
    for (int crab : crabs)
    {
        fuelCost += abs(target - crab);
    }
    return fuelCost;
}

int main()
{
    vector<int> crabPositions = GetCrabPositions();

    int median = Median(crabPositions);
    std::cout << "Median is "<< median<< std::endl;
    std::cout << "Fuel cost to get to "<< median <<" is "<<CalculateMigrationCost(crabPositions, median) << std::endl;

    return 0;
}