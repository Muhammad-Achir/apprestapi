'use strict'

var response = require('./res')
var connection = require('./connect')

exports.index = function(req, res) {
    response.ok("Application REST API is running", res)
}

//show all data mahasiswa
exports.showAllDataMahasiswa = function(req, res) {
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields) {
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
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id], function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    })
}

// add new data
exports.addNewData = function(req, res) {
    let nim = req.body.nim
    let nama = req.body.nama
    let jurusan = req.body.jurusan

    connection.query('INSERT INTO mahasiswa (nim, nama, jurusan) VALUES(?, ?, ?)', [nim, nama, jurusan],
        function(error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok("Succed Add New Data", res)
            }
        })
}

// update data by id
exports.updateDataById = function(req, res) {
    let id = req.body.id_mahasiswa
    let nim = req.body.nim
    let nama = req.body.nama
    let jurusan = req.body.jurusan

    connection.query('UPDATE mahasiswa SET nim = ?, nama = ?,jurusan = ? WHERE id_mahasiswa = ?', [nim, nama, jurusan, id], function(error, rows, fields) {
        if (error) {
            console.error();
        } else {
            response.ok("Succed update data", res)
        }
    })
}

// Delete data by id
exports.deleteDataById = function(req, res) {
    let id = req.body.id_mahasiswa

    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa = ?', [id], function(error, rows, fields) {
        if (error) {
            console.error();
        } else {
            response.ok("Succed Delete data", res)
        }
    })
}