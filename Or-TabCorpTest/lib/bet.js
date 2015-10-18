function Bet(product, selections, stake) {
    this._product = product;
    this._selections = selections;
    this._stake = stake;
}

Bet.prototype.getProduct = function () {
    return this._product;
};

Bet.prototype.getSelections = function () {
    return this._selections;
};
Bet.prototype.getStake = function () {
    return this._stake;
};

module.exports = Bet;
