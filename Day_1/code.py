def GetNumbers():
    f = open("input.txt","r")
    l = f.readlines()
    nums = []
    for i in range(len(l)):
        num = int(l[i])
        nums.append(num)
    return nums

def GetIncreases(nums):
    increases = 0
    for i in range(1, len(nums)):
        if nums[i-1] < nums[i]:
            increases+=1
    return increases

print(GetIncreases(GetNumbers()))
