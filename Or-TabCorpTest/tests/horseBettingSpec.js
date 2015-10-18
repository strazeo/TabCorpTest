var assert = require('assert'),
    fs = require('fs'),
    Result = require('../lib/result.js'),
    Bet = require('../lib/bet.js'),
    bettingEngine = require('../lib/horseBetting.js');


exports['Valid engine input'] = function () {
    var betsArray = [];
    betsArray.push(new Bet("W" , "5" , "5"));
    betsArray.push(new Bet("P" , "2" , "5"));
    betsArray.push(new Bet("P" , "1" , "5"));
    betsArray.push(new Bet("P" , "5" , "5"));
    betsArray.push(new Bet("E" , "5,1" , "5"));
    betsArray.push(new Bet("W" , "5" , "5"));
    var result = new Result("5", "1", "2");
    
    hook = captureStream(process.stdout); // intercept stdout
    bettingEngine.execute(betsArray, result, process.stdout);
    hook.unhook(); // stop intercepting
    
    assert.equal(hook.captured(), "Win:5:$0.85\nPlace:5:$0.88\nPlace:1:$0.88\nPlace:2:$0.88\nExacta:5,1:$0.82\n");

    betsArray = [];
    betsArray.push(new Bet('W', '1', '3'));
    betsArray.push(new Bet('W', '2', '4'));
    betsArray.push(new Bet('W', '3', '5'));
    betsArray.push(new Bet('W', '4', '5'));
    betsArray.push(new Bet('W', '1', '16'));
    betsArray.push(new Bet('W', '2', '8'));
    betsArray.push(new Bet('W', '3', '22'));
    betsArray.push(new Bet('W', '4', '57'));
    betsArray.push(new Bet('W', '1', '42'));
    betsArray.push(new Bet('W', '2', '98'));
    betsArray.push(new Bet('W', '3', '63'));
    betsArray.push(new Bet('W', '4', '15'));
    betsArray.push(new Bet('P', '1', '31'));
    betsArray.push(new Bet('P', '2', '89'));
    betsArray.push(new Bet('P', '3', '28'));
    betsArray.push(new Bet('P', '4', '72'));
    betsArray.push(new Bet('P', '1', '40'));
    betsArray.push(new Bet('P', '2', '16'));
    betsArray.push(new Bet('P', '3', '82'));
    betsArray.push(new Bet('P', '4', '52'));
    betsArray.push(new Bet('P', '1', '18'));
    betsArray.push(new Bet('P', '2', '74'));
    betsArray.push(new Bet('P', '3', '39'));
    betsArray.push(new Bet('P', '4', '105'));
    betsArray.push(new Bet('E', '1,2', '13'));
    betsArray.push(new Bet('E', '2,3', '98'));
    betsArray.push(new Bet('E', '1,3', '82'));
    betsArray.push(new Bet('E', '3,2', '27'));
    betsArray.push(new Bet('E', '1,2', '5'));
    betsArray.push(new Bet('E', '2,3', '61'));
    betsArray.push(new Bet('E', '1,3', '28'));
    betsArray.push(new Bet('E', '3,2', '25'));
    betsArray.push(new Bet('E', '1,2', '81'));
    betsArray.push(new Bet('E', '2,3', '47'));
    betsArray.push(new Bet('E', '1,3', '93'));
    betsArray.push(new Bet('E', '3,2', '51'));
    var result = new Result("2", "3", "1");

    hook = captureStream(process.stdout); // intercept stdout
    bettingEngine.execute(betsArray, result, process.stdout);
    hook.unhook(); // stop intercepting
    
    assert.equal(hook.captured(), "Win:2:$2.61\nPlace:2:$1.06\nPlace:3:$1.27\nPlace:1:$2.13\nExacta:2,3:$2.43\n");
}

exports['Invalid engine input'] = function () {
    var betsArray = [];
    betsArray.push(new Bet("W" , "5" , "5"));
    betsArray.push(new Bet("P" , "2" , "5"));
    betsArray.push(new Bet("P" , "1" , "5"));
    betsArray.push(new Bet("P" , "5" , "5"));
    betsArray.push(new Bet("E" , "5,1" , "5"));
    betsArray.push(new Bet("W" , "5" , "5"));
    var result = null;
    
    hook = captureStream(process.stdout); // intercept stdout
    bettingEngine.execute(betsArray, result, process.stdout);
    hook.unhook(); // stop intercepting
    
    assert.equal(hook.captured(), "");

    var betsArray = [];
    var result = new Result("5", "1", "2");
    
    hook = captureStream(process.stdout); // intercept stdout
    bettingEngine.execute(betsArray, result, process.stdout);
    hook.unhook(); // stop intercepting
    
    assert.equal(hook.captured(), "");

}

function captureStream(stream) {
    var oldWrite = stream.write;
    var buf = '';
    stream.write = function (chunk, encoding, callback) {
        buf += chunk.toString(); // chunk is a String or Buffer
        oldWrite.apply(stream, arguments);
    }
    
    return {
        unhook: function unhook() {
            stream.write = oldWrite;
        },
        captured: function () {
            return buf;
        }
    };
}