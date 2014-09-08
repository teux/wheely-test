var util = require('util');
var express = require('express');

module.exports = function () {
    this.use(express.static(__dirname + '/../../public'));
};
