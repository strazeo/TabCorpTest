var logger = require('./logger.js');

exports = module.exports = {};

function parse(line) {
    if (line.match('^[a-zA-Z]+:([a-zA-Z]|[0-9]+):[0-9,]+:[0-9]+$')) { // regex for lines of structure : word:(letter or positive number):positive number:positive number
        return line.split(':');
    }
    else {
        logger.log("Unexpected line format: " + line);
    }
    return null;
};

function processInput(linesArray) {
    var parsedLines = [];
    linesArray.forEach(function (line) {
        var parsedLine = parse(line.trim()); // turn valid lines into an array
        if (parsedLine) { // if line is valid, an array will return
            parsedLines.push(parsedLine);
        }
    });
    return parsedLines;
}

exports.processInput = processInput;

