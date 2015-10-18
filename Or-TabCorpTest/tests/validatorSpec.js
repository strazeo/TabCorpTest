var assert = require('assert'),
    Bet = require('../lib/bet.js'),
    Result = require('../lib/result.js'),
    validator = require('../lib/validator.js');


exports['Valid Bets'] = function () {
    var betsArray = [];
    betsArray.push(["Bet" , "W" , "5" , "5"]);
    betsArray.push(["Bet" , "E" , "5,2" , "20"]);
    betsArray.push(["Bet" , "P" , "1" , "50"]);

    var returnedArray = validator.validateBets(betsArray);
    assert.deepEqual(returnedArray[0] , new Bet("W", ["5"], "5"));
    assert.deepEqual(returnedArray[1] , new Bet("E", ["5", "2"], "20"));
    assert.deepEqual(returnedArray[2] , new Bet("P", ["1"], "50"));
}

exports['Valid results'] = function () {
    var validatedResult = validator.validateResult(["Result", "3", "5", "2"]);
    assert.deepEqual(validatedResult , new Result("3", "5", "2"));

    var validatedResult = validator.validateResult(["Result", "20", "59", "1"]);
    assert.deepEqual(validatedResult , new Result("20", "59", "1"));
}

exports['Invalid results'] = function () {
    var validatedResult = validator.validateResult(["Result", "W", "5", "2"]);
    assert.deepEqual(validatedResult , null);
    
    var validatedResult = validator.validateResult(["Something", "20", "59", "1"]);
    assert.deepEqual(validatedResult , null);

    var validatedResult = validator.validateResult(null);
    assert.deepEqual(validatedResult , null);

    var validatedResult = validator.validateResult("");
    assert.deepEqual(validatedResult , null);
}

exports['Invalid Bets'] = function () {
    var betsArray = [];
    betsArray.push(["Bet" , "2" , "5" , "5"]);
    betsArray.push(["Bet" , "P" , "5,2" , "20"]);
    betsArray.push(["Bet" , "E" , "1" , "50"]);
    
    var returnedArray = validator.validateBets(betsArray);
    assert.deepEqual(returnedArray, []);

    betsArray = [];
    var returnedArray = validator.validateBets(betsArray);
    assert.deepEqual(returnedArray, []);
}