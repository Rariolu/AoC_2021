def GetNumbers():
    f = open("input.txt","r")
    l = f.readlines()
    nums = []
    for i in range(len(l)):
        num = int(l[i])
        nums.append(num)
    print("len nums",len(nums))
    return nums

def GetIncreases(nums):
    increases = 0
    for i in range(1, len(nums)):
        if nums[i-1] < nums[i]:
            increases+=1
    return increases

def GetIncreasesInSlidingWindows(nums):
    increases = 0
    for i in range(2, len(nums)-1):
        win1 = nums[i-2] + nums[i-1] + nums[i]
        win2 = nums[i-1] + nums[i] + nums[i+1]
        if win1 < win2:
            increases+=1
    return increases

nums = GetNumbers()
print(GetIncreases(nums))
print(GetIncreasesInSlidingWindows(nums))
