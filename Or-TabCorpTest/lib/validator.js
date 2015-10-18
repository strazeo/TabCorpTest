var Bet = require('./Bet.js'),
    Result = require('./Result.js'),
    logger = require('./logger.js');

function isNumInvalid(num){
    return (Number.isNaN(parseInt(num)) || parseInt(num) <= 0);
}

function validateBets(lines) {
    var betsArray = [];
    lines.forEach(function (parsedArray) {
        lineType = parsedArray[0];
        switch (lineType) {
            case "Bet":
                var isValid = true;
                var product = parsedArray[1], selections = parsedArray[2], stake = parsedArray[3];
                
                if (product != "W" && product != "E" && product != "P") { // check for valid product
                    isValid = false;
                }
                
                selectionArray = selections.split(',');
                if (selectionArray.length > 2 | selectionArray.length == 0) { // should have either 1 or 2 selections at most seperated by ',' 
                    isValid = false;
                }
                
                if (product == "E" && selectionArray.length != 2 || selectionArray.length == 2 && product != "E") { // allow 2 selections only with product E
                    isValid = false;
                }
                
                // negative numbers wont pass through stdinParser, but validate anyway since the parser can always change in the future
                if (isNumInvalid(stake)) {
                    isValid = false;
                }
                // same as above, make sure non negative numbers
                for (var i = 0; i < selectionArray.length; i++) { 
                    if (isNumInvalid(selectionArray[i])) {
                        isValid = false;
                    }
                }
                
                if (isValid) { // everything is ok, create a new Bet object
                    betsArray.push(new Bet(product, selectionArray, stake));
                }
                else {
                    logger.log("Invalid bet parameters: " + parsedArray);
                };
                break;
            default:
                logger.log("Invalid line type: " + lineType);
        }
    });

    return betsArray;
}

function validateResult(resultLine) {
    if (resultLine == null || resultLine.length == 0) {
        return null;
    }
    var isValid = true;
    if (resultLine[0] != "Result") { // ensure line starts with 'Result'
        isValid = false;
    }
    for (var i = 1; i < resultLine.length; i++) { // ensure positive numbers
        if (isNumInvalid(resultLine[i])) {
            isValid = false;
        }
    }

    if (isValid) { // everything is ok , create a new Result object
        return new Result(resultLine[1],resultLine[2],resultLine[3]);
    }

    return null;
}

exports.validateResult = validateResult;
exports.validateBets = validateBets;