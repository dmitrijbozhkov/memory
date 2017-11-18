/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
function countIntervals(min, max, delta) {
    var interval = true;
    var intSet = [];
    var count = min;
    while (interval) {
        intSet.push(parseFloat(count.toFixed(2)));
        count += delta;
        if (count > max) {
            interval = false;
        }
    }
    return intSet;
}
function findBin(keys, value) {
    for (var i = 0; i < keys.length; i += 1) {
        if (keys[i] > value) {
            return i - 1;
        }
    }
    return keys.length - 2;
}
function populateIntervals(intervals, data) {
    var bins = intervals.slice(0, intervals.length - 1).map(function () { return []; });
    data.forEach(function (row) {
        for (var i = 0; i < row.length; i += 1) {
            bins[findBin(intervals, row[i])].push(row[i]);
        }
    });
    return bins;
}
function countBins(bins) {
    return bins.map(function (bin) { return bin.length; });
}
function countProbability(counts, amount) {
    return counts.map(function (len) { return len / amount; });
}
function countHeight(probability, delta) {
    return probability.map(function (prob) { return prob / delta; });
}
function countApprox(intervals) {
    var approx = new Array(intervals.length - 1);
    for (var i = 0; i < approx.length; i += 1) {
        approx[i] = (intervals[i] + intervals[i + 1]) / 2;
    }
    return approx;
}
function headerIntervals(intervals) {
    var headers = new Array(intervals.length - 1);
    for (var i = 0; i < headers.length; i += 1) {
        headers[i] = intervals[i] + " - " + intervals[i + 1];
    }
    return headers;
}
function countSet(data) {
    return data.reduce(function (acc, row) { return acc + row.length; }, 0);
}
function STATINTERVALS(data, min, max, delta) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var intervals = countIntervals(min, max, delta);
    var bins = populateIntervals(intervals, data);
    var amounts = countBins(bins);
    var headers = headerIntervals(intervals);
    var probability = countProbability(amounts, countSet(data));
    var approximation = countApprox(intervals);
    var height = countHeight(probability, delta);
    return [headers, amounts, probability, approximation, height];
}
