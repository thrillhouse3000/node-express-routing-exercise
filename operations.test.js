const operations = require('./operations')

describe('mean tests', () => {
    afterEach(() => {
        nums = '';
    });
    test('mean function', () => {
        let nums = [1,2,3,4];
        let mean = operations.mean(nums);
        expect(mean).toEqual(2.5);
    });
});

describe('median tests', () => {
    afterEach(() => {
        nums = '';
    });
    test('median even', () => {
        let nums = [1,2,3,4];
        let median = operations.median(nums);
        expect(median).toEqual(2.5);
    });
    test('median odd', () => {
        let nums = [1,2,3,4,5];
        let median = operations.median(nums);
        expect(median).toEqual(3);
    });
});

describe('mode tests', () => {
    afterEach(() => {
        nums = '';
    });
    test('mode', () => {
        let nums = [1,2,3,3,4];
        let mode = operations.mode(nums);
        expect(mode).toEqual(3);
    });
    test('mode no repeats', () => {
        let nums = [1,2,3,4,5];
        let mode = operations.mode(nums);
        expect(mode).toEqual("There is no mode");
    });
});

