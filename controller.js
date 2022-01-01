'use strict'

var response = require('./res')
var connection = require('./connect')

exports.index = function(req, res) {
    response.ok("Application REST API is running", res)
}

//show all data mahasiswa
exports.showDataMahasiswa = function(req, res) {
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fileds) {
        if (error) {
            connection.log(error)
        } else {
            response.ok(rows, res)
        }
    })
}