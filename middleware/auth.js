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

// controller for login
exports.login = function(req, res) {
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?"
    var table = ["user", "password", md5(post.password), "email", post.email]

    query = mysql.format(query, table)

    connection.query(query, function(error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 1) {
                let token = jwt.sign({ rows }, config.secret, {
                    expiresIn: 1440
                })
                id_user = rows[0].id

                let data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?"
                var table = ["akses_token"]

                query = mysql.format(query, table)
                connection.query(query, data, function(error, rows) {
                    if (error) {
                        console.error();
                    } else {
                        res.json({
                            success: true,
                            message: 'Token JWT integrated',
                            token: token,
                            currUser: data.id_user
                        });
                    }
                })
            } else {
                res.json({ "Error:": true, "Message": "there is something wrong with your email or password!" });
            }
        }
    })
}

exports.anonymousePage = function(req, res) {
    response.ok("This page just for private page with user role = 2!", res)
}