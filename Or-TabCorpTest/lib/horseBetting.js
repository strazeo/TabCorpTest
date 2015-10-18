var logger = require('./logger.js');

// Declare commision constants
var WIN_COMMISION = 0.15, 
    PLACE_COMMISION = 0.12,
    EXACTA_COMMISION = 0.18;

var winBetCounters = {},
    placeBetCounters = {},
    exactaBetCounters = {},
    winTotalPool = 0,
    placeTotalPool = 0,
    exactaTotalPool = 0;

function initVariables() {
    winBetCounters = {},
    placeBetCounters = {},
    exactaBetCounters = {},
    winTotalPool = 0,
    placeTotalPool = 0,
    exactaTotalPool = 0;
}

// keep a dictionary for each product of the stakes on each horse - where key is the bet and value is the total stakes on that horse
function updateBetCounter(counter, selections, stake) {
    if (selections.length == 1) { // if not exacta use horse number as key, else use the exacta combination as key
        selections = selections[0];
    } 

    if (counter[selections] == undefined) {
        counter[selections] = 0;
    }
    counter[selections] += stake;
}

function processBets(validBets) {
    validBets.forEach(function (bet) {
        var currentStake = parseInt(bet.getStake());
        switch (bet.getProduct()) {
            case "W":
                winTotalPool += currentStake; // update the Win pool
                updateBetCounter(winBetCounters, bet.getSelections(), currentStake) // update Win product horse bet dictionary
                break;
            case "P":
                placeTotalPool += currentStake; // update the Place pool
                updateBetCounter(placeBetCounters, bet.getSelections(), currentStake) // update Place product horse bet dictionary
                break;
            case "E":
                exactaTotalPool += currentStake; // update the Exacta pool
                updateBetCounter(exactaBetCounters, bet.getSelections(), currentStake) // update Exacta product horse bet dictionary
                break;
            default:
                throw new Error("Validator isn't working properly, invalid product in valid bets");
        }
    });
}

function processResult(result, output) {
    // output Win product result dividend
    winDividend = (winTotalPool * (1 - WIN_COMMISION)) / winBetCounters[result.getFirst()];
    output.write("Win:" + result.getFirst() + ":$" + winDividend.toFixed(2) + "\n");

    // output Place product result dividends
    partialPlacePool = (placeTotalPool * (1 - PLACE_COMMISION) ) / 3;
    firstPlaceDividend = partialPlacePool / placeBetCounters[result.getFirst()];
    secondPlaceDividend = partialPlacePool / placeBetCounters[result.getSecond()];
    thirdPlaceDividend = partialPlacePool / placeBetCounters[result.getThird()];
    output.write("Place:" + result.getFirst() + ":$" + firstPlaceDividend.toFixed(2) + "\n");
    output.write("Place:" + result.getSecond() + ":$" + secondPlaceDividend.toFixed(2) + "\n");
    output.write("Place:" + result.getThird() + ":$" + thirdPlaceDividend.toFixed(2) + "\n");

    // output Exacta product result dividends
    exactaDividend = (exactaTotalPool * (1 - EXACTA_COMMISION)) / exactaBetCounters[[result.getFirst().toString(), result.getSecond().toString()]];
    output.write("Exacta:" + result.getFirst() + "," + result.getSecond() + ":$" + exactaDividend.toFixed(2) + "\n");
}

function execute(validBets, result, output){
    if (result == null || validBets.length == 0 ) { // possible when validator rejected all bet lines or result line
        logger.log("warn", "Invalid input - missing valid result line at end of input");
        return;
    }
    initVariables(); // reset counters and pool sums - extended funcitonality for future extensions
    processBets(validBets); // engine starts by putting all bets into the system
    processResult(result, output); // and finally prints the result
}

exports.execute = execute;