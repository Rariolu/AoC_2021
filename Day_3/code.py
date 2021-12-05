def GetReport():
    f = open("input.txt","r")
    #f = open("testdata.txt", "r")
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
        for j in range(len(line)):
            bit = line[j]
            if bit == '1':
                bitCount[j] += 1
    
    mostCommonBits = []
    for i in range(len(bitCount)):
        if (bitCount[i] >= (len(report)/2)):
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

def ApplyBitCriteria(arr, currentBit, comVal, isMostCommon):
    if len(arr) <= 1:
        retStr = arr[0]
        if '\n' in retStr:
            retStr = retStr[0: -1]
        
        return retStr
    
    newArr = []
    for i in range(len(arr)):
        binVal = arr[i]
        if binVal[currentBit] == comVal:
            newArr.append(binVal)
        else:
            z = 0
    
    bitCount = 0
    for i in range(len(newArr)):
        if newArr[i][currentBit+1] == '1':
            bitCount+=1
    
    newBit = '0'
    antiBitCount = len(newArr) - bitCount

    if isMostCommon:
        if bitCount >= antiBitCount:
            newBit = '1'
    else:
        if bitCount < antiBitCount:
            newBit = '1'

    return ApplyBitCriteria(newArr, currentBit+1, newBit, isMostCommon)


def GetBinArr(binStr):
    binArr = []
    for i in range(len(binStr)):
        binArr.append(int(binStr[i]))
    return binArr

def GetLifeSupportRating(report):

    firstBitCount = 0
    
    for i in range(len(report)):
        if report[i][0] == '1':
            firstBitCount+=1

    if firstBitCount >= len(report) - firstBitCount:
        oxBit = '1'
        scrubBit = '0'
    else:
        oxBit = '0'
        scrubBit = '1'
    
    oxygenStr = ApplyBitCriteria(report, 0, oxBit, True)
    scrubberStr = ApplyBitCriteria(report, 0, scrubBit, False)

    oxygen = GetBinArr(oxygenStr)
    scrubber = GetBinArr(scrubberStr)

    oxyDen = GetDenary(oxygen)
    scrubDen = GetDenary(scrubber)
    
    return oxyDen * scrubDen

print("Power consumption is", GetPowerConsumption(GetReport()))
print("Life Support Rating is",GetLifeSupportRating(GetReport()))