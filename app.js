const express = require('express');
const ExpressError = require('./expressError');
const operations = require('./operations');

const app = express();

app.get('/', (req, res) => {
    return res.json('Welcome to Express Calculator. Type /operation?nums=x,y,z after base URL to calculate')
})

app.get('/mean', (req, res, next) => {
    try {
        const {nums} = req.query;
        numsArr = makeArr(nums);
        checkForErrors(numsArr);
        let response = createResponse('mean', numsArr);
        return res.json(response);
    } catch (err) {
        return next(err);
    } 
});

app.get('/median', (req, res, next) => {
    try {
        const {nums} = req.query;
        numsArr = makeArr(nums);
        checkForErrors(numsArr);
        let response = createResponse('median', numsArr);
        return res.json(response);
    } catch (err) {
        return next(err);
    } 
});

app.get('/mode', (req, res, next) => {
    try {
        const {nums} = req.query;
        const numsArr = makeArr(nums);
        checkForErrors(numsArr);
        let response = createResponse('mode', numsArr);
        return res.json(response);
    } catch (err) {
        return next(err);
    } 
});

app.get('/all', (req, res, next) => {
    try {
        const {nums} = req.query;
        const numsArr = makeArr(nums);
        checkForErrors(numsArr);
        let response = createResponse('all', numsArr);
        return res.json(response);
    } catch (err) {
        return next(err);
    } 
});

app.use((error, req, res, next) => {
    let status = error.status || 500;
    let message = error.message;
    return res.status(status).json({
        error: {message, status}
    });
});

app.listen(3000, () => {
    console.log("Serving on port 3000");
});


// Route Functions

function makeArr(nums){
    let arr = [];
    for(let num of nums.replaceAll(',', '')) {
        arr.push(+num)
    };
    return arr;
};

function checkForErrors(numsArr) {
    if(numsArr.includes(NaN)) {
        throw new ExpressError("All inputs must be numbers", 400);
    } else if (numsArr.length === 0) {
        throw new ExpressError("Input required", 400);
    };
};

function createResponse(operation, numsArr) {
    let opsObj = {
        "mean": operations.mean,
        "median": operations.median,
        "mode": operations.mode,
    }
    let response = ''
    if(operation === 'all') {
        let mean = operations.mean(numsArr);
        let median = operations.median(numsArr);
        let mode = operations.mode(numsArr);
        response = {response: {
            operation: "all",
            mean: mean,
            mode: mode,
            median: median
        }};
    } else {
        let result = opsObj[operation](numsArr);
        response = {response: {
            operation: operation,
            value: result
        }};
    };
    return response
}