var readline = require('readline'),
    BettingApplication = require('./lib/bettingApplication.js'),
    parser = require('./lib/stdinParser.js'),
    validator = require('./lib/validator.js'),
    bettingEngine = require('./lib/horseBetting.js');
    

// Listen to stdin for input
var allLines = [];
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

// On every line inputted into stdin, add to the allLines array
rl.on('line', function (line) {
    allLines.push(line);
})

// Once input is closed, create our main bettingApplication and run it with the provided input
rl.on('close', function () {
    var bettingApp = new BettingApplication(parser, validator, bettingEngine, process.stdout); 
    bettingApp.run(allLines); // execute the main code
})

