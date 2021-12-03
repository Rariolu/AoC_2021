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

def GetPowerConsumption(report):
    bitCount = [0,0,0,0,0,0,0,0,0,0,0,0]
    for i in range(len(report)):
        line = report[i]
        for j in range(12):
            bit = line[j]
            if bit == '1':
                bitCount[j] += 1

    mostCommonBits = []
    leastCommonBits = []
    for i in range(len(bitCount)):
        if (bitCount[i] >= 500):
            mostCommonBits.append(1)
            leastCommonBits.append(0)
        else:
            mostCommonBits.append(0)
            leastCommonBits.append(1)
    
    gamma = GetDenary(mostCommonBits)
    epsilon = GetDenary(leastCommonBits)

    return gamma * epsilon    


print("Power consumption is", GetPowerConsumption(GetReport()))