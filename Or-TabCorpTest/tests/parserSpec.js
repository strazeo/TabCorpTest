var assert = require('assert'),
    parser = require('../lib/stdinParser.js');


exports['Parse valid lines'] = function () {
    var parsedLines = parser.processInput(["Bet:W:3:5"]);
    assert.deepEqual(parsedLines, [['Bet', 'W', '3', '5']]);

    parsedLines = parser.processInput(["Bet:E:3,5:5"]);
    assert.deepEqual(parsedLines, [['Bet', 'E', '3,5', '5']]);

    parsedLines = parser.processInput(["Result:5:35:55"]);
    assert.deepEqual(parsedLines, [['Result', '5', '35', '55']]);
}

exports['Invalid line - Bad Format'] = function () {
    var parsedLines = parser.processInput(["Bet:W:3:5:20"]);
    assert.deepEqual(parsedLines, []);
}