'use strict'

var response = require('./res')
var connection = require('./connect')

exports.index = function(req, res) {
    response.ok("Application REST API is running", res)
}

//show all data mahasiswa
exports.showAllDataMahasiswa = function(req, res) {
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fileds) {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    })
}

//show all data by id
exports.showDataMahasiswaById = function(req, res) {
    let id = req.params.id
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        }
    )
}