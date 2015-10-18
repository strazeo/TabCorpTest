var logger = exports,
    log_file = null,
    fs = require('fs');

logger.debugLevel = 'warn';
logger.log = function (level, message) {
    if (log_file == null)
        log_file = fs.createWriteStream(__dirname + '/debug.log', { flags : 'a' });
    currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var levels = ['error', 'warn', 'info'];
    if (levels.indexOf(level) >= levels.indexOf(logger.debugLevel)) {
        if (typeof message !== 'string') {
            message = JSON.stringify(message);
        };
        log_file.write(currentDate + " - " + level + ': ' + message + '\n');
    }
}