function Result(first, second, third) {
    this._first = first;
    this._ssecond = second;
    this._third = third;
}


Result.prototype.getFirst = function () {
    return this._first;
};

Result.prototype.getSecond = function () {
    return this._ssecond;
};
Result.prototype.getThird = function () {
    return this._third;
};

module.exports = Result;
