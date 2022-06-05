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
        if(numsArr.includes(NaN)) {
            throw new ExpressError("All inputs must be numbers", 400);
        } else if (numsArr.length === 0) {
            throw new ExpressError("Input required", 400);
        };
        let mean = operations.mean(numsArr);
        let response = {response: {
            operation: "mean",
            value: mean
        }};
        return res.json(response);
    } catch (err) {
        return next(err);
    } 
});

app.get('/median', (req, res, next) => {
    try {
        const {nums} = req.query;
        numsArr = makeArr(nums);
        if(numsArr.includes(NaN)) {
            throw new ExpressError("All inputs must be numbers", 400);
        } else if (numsArr.length === 0) {
            throw new ExpressError("Input required", 400);
        };
        let median = operations.median(numsArr);
        let response = {response: {
            operation: "median",
            value: median
        }};
        return res.json(response);
    } catch (err) {
        return next(err);
    } 
});

app.get('/mode', (req, res, next) => {
    try {
        const {nums} = req.query;
        numsArr = makeArr(nums);
        if(numsArr.includes(NaN)) {
            throw new ExpressError("All inputs must be numbers", 400);
        } else if (numsArr.length === 0) {
            throw new ExpressError("Input required", 400);
        };
        let mode = operations.mode(numsArr);
        let response = {response: {
            operation: "mode",
            value: mode
        }};
        return res.json(response);
    } catch (err) {
        return next(err);
    } 
});

app.get('/all', (req, res, next) => {
    try {
        const {nums} = req.query;
        numsArr = makeArr(nums);
        if(numsArr.includes(NaN)) {
            throw new ExpressError("All inputs must be numbers", 400);
        } else if (numsArr.length === 0) {
            throw new ExpressError("Input required", 400);
        };
        let mean = operations.mean(numsArr);
        let median = operations.median(numsArr);
        let mode = operations.mode(numsArr);
        let response = {response: {
            operation: "all",
            mean: mean,
            mode: mode,
            median: median
        }};
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

function makeArr(nums){
    let arr = [];
    for(let num of nums.replaceAll(',', '')) {
        arr.push(+num)
    };
    return arr;
};