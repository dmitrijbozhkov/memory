/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />

type dataSet = Array<number[]>;

function countIntervals(min: number, max: number, delta: number): number[] {
    let interval = true;
    let intSet = [];
    let count = min;
    while (interval) {
        intSet.push(parseFloat(count.toFixed(2)));
        count += delta;
        if (count > max) {
            interval = false;
        }
    }
    return intSet;
}

function findBin(keys: number[], value: number): number {
    for (let i = 0; i < keys.length; i += 1) {
        if (keys[i] > value) {
            return i - 1;
        }
    }
    return keys.length - 2;
}

function populateIntervals(intervals: number[], data: dataSet): dataSet {
    let bins = intervals.slice(0, intervals.length - 1).map(() => { return []; });
    data.forEach((row: number[]) => {
        for (let i = 0; i < row.length; i += 1) {
            bins[findBin(intervals, row[i])].push(row[i]);
        }
    });
    return bins;
}

function countBins(bins: dataSet): number[] {
    return bins.map((bin) => { return bin.length; });
}

function countProbability(counts: number[], amount: number): number[] {
    return counts.map((len) => { return len / amount; });
}

function countHeight(probability: number[], delta: number): number[] {
    return probability.map((prob) => { return prob / delta; });
}

function countApprox(intervals: number[]): number[] {
    let approx = new Array(intervals.length - 1);
    for (let i = 0; i < approx.length; i += 1) {
        approx[i] = (intervals[i] + intervals[i + 1]) / 2;
    }
    return approx;
}

function headerIntervals(intervals: number[]) {
    let headers = new Array(intervals.length - 1);
    for (let i = 0; i < headers.length; i += 1) {
        headers[i] = `${intervals[i]} - ${intervals[i + 1]}`;
    }
    return headers;
}

function countSet(data: dataSet) {
    return data.reduce((acc, row) => { return acc + row.length; }, 0);
}

function STATINTERVALS(data: dataSet, min: number, max: number, delta: number) {
    let sheet = SpreadsheetApp.getActiveSpreadsheet();
    let intervals = countIntervals(min, max, delta);
    let bins = populateIntervals(intervals, data);
    let amounts = countBins(bins);
    let headers = headerIntervals(intervals);
    let probability = countProbability(amounts, countSet(data));
    let approximation = countApprox(intervals);
    let height = countHeight(probability, delta);
    return [ headers, amounts, probability, approximation, height ];
}