'use strict'

module.exports = function(app) {
    var myJson = require('./controller')

    app.route('/')
        .get(myJson.index)

    app.route('/show/')
        .get(myJson.showAllDataMahasiswa)

    app.route('/show/:id')
        .get(myJson.showDataMahasiswaById)

    app.route('/add')
        .post(myJson.addNewData)

    app.route('/update')
        .put(myJson.updateDataById)

    app.route('/delete')
        .delete(myJson.deleteDataById)

    app.route('/show-matakuliah')
        .get(myJson.showGroupMatakuliah)
}