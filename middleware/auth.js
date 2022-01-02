let connection = require('../connect')
let mysql = require('mysql')
let md5 = require('MD5')
let response = require('../res')
let jwt = require('jsonwebtoken')
let config = require('../config/secret')
let ip = require('ip')
const conn = require('../connect')

// controller for register
exports.registration = function(req, res) {
    let post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    var query = "SELECT email FROM ?? WHERE ?? = ?"
    var table = ["user", "email", post.email]

    query = mysql.format(query, table)

    connection.query(query, function(error, rows) {
        if (error) {
            console.error();
        } else {
            if (rows.length == 0) {
                var query = "INSERT INTO ?? SET ?"
                var table = ["user"]
                query = mysql.format(query, table)
                connection.query(query, post, function(error, rows) {
                    if (error) {
                        console.error();
                    } else {
                        response.ok("Succed add new user", res)
                    }
                })
            } else {
                response.ok("Email has been registered", res)
            }
        }
    })
}