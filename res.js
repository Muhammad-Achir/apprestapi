'use strict'

exports.ok = function(values, res) {
    var data = {
        'status': 200,
        'values': values
    }

    res.json(data)
    res.end()
}

// response for nested matakuliah or grouping matakuliah
exports.okNested = function(values, res) {
    // do acumulation
    const result = values.reduce((accumulate, item) => {
        // define key group
        if (accumulate[item.nama]) {
            // make variabel group nama mahasiswa
            const group = accumulate[item.nama]
                // check if value of array is matakuliah
            if (Array.isArray(group.matakuliah)) {
                // add value in to group matakuliah
                group.matakuliah.push(item.matakuliah)
            } else {
                group.matakuliah = [group.matakuliah, item.matakuliah]
            }
        } else {
            accumulate[item.nama] = item
        }
        return accumulate
    }, {})

    let data = {
        'status': 200,
        'values': result
    }

    res.json(data)
    res.end()
}