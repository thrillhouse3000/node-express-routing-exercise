function mean(nums) {
    let sum = 0;
    for (let num of nums) {
        sum += num;
    };
    return (sum/nums.length);
}

function median(nums) {
    if(nums.length % 2 !== 0) {
        let middle = Math.floor(nums.length/2);
        return nums[middle];
    } else {
        let middleTwo = [nums[(nums.length/2)-1], nums[(nums.length/2)]];
        return mean(middleTwo);
    }
}

function mode(nums) {
    let counter = {};
    for(let num of nums) {
        if(counter[num]) {
            counter[num] += 1;
        } else {
            counter[num] = 1;
        }
    };
    
    let values = Object.values(counter);
    if(values.every(n => n === 1)) {
        return "There is no mode";
    };

    let mode = 0;
    for(let key in counter) {
        if (counter[key] > mode) {
            mode = key;
        }
    };
    return +mode;
}

module.exports = {mean, median, mode}