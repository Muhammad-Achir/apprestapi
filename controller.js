'use strict'

var response = require('./res')
var connection = require('./connect')

exports.index = function(req, res) {
    response.ok("Application REST API is running")
}