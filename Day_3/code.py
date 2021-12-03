def GetReport():
    f = open("input.txt","r")
    l = f.readlines()
    return l

def GetDenary(binArr):
    num = 0
    for i in range(len(binArr)):
        p = len(binArr) - i - 1
        num += binArr[i] * 2 ** p
    return num

def GetMostCommonBits(report):
    bitCount = [0,0,0,0,0,0,0,0,0,0,0,0]
    for i in range(len(report)):
        line = report[i]
        for j in range(12):
            bit = line[j]
            if bit == '1':
                bitCount[j] += 1
    
    mostCommonBits = []
    for i in range(len(bitCount)):
        if (bitCount[i] >= 500):
            mostCommonBits.append(1)
        else:
            mostCommonBits.append(0)
    return mostCommonBits

def FlipBits(binArr):
    newBinArr = []
    for i in range(len(binArr)):
        if binArr[i] == 0:
            newBinArr.append(1)
        else:
            newBinArr.append(0)
    return newBinArr

def GetPowerConsumption(report):
    mostCommonBits = GetMostCommonBits(report)
    leastCommonBits = FlipBits(mostCommonBits)
    
    gamma = GetDenary(mostCommonBits)
    epsilon = GetDenary(leastCommonBits)

    return gamma * epsilon

print("Power consumption is", GetPowerConsumption(GetReport()))