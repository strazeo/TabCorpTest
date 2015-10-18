var logger = require('./logger.js');

// Main application, designed to be operable with different validators, parsers, betting rules and outputStreams
function BettingApplication(parser, validator, bettingEngine, outputStream) {
    this._parser = parser;
    this._validator = validator;
    this._bettingEngine = bettingEngine;
    this._outputStream = outputStream;

    this._validBets = [];
    this._result = null;
}

BettingApplication.prototype.run = function (input) {
    var parsedInputArray = this._parser.processInput(input); // process the input using the parser provider to the application
    var resultLine = parsedInputArray.pop(); // remove the last line, 'Result' line can only come at end of input
    this._result = this._validator.validateResult(resultLine); // validate that indeed the last line is a result line
    this._validBets = this._validator.validateBets(parsedInputArray); // validate all the other lines (i.e. the bets)
    this._bettingEngine.execute(this._validBets, this._result, this._outputStream); // execute the bettingEngine on all valid bets
}

module.exports = BettingApplication;