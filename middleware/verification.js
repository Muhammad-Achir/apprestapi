const jwt = require('jsonwebtoken')
const config = require('../config/secret')

// add function to chechk roles of user
function verification(roles) {
    return function(req, rest, next) {
        // check authorization header
        var tokenWithBearer = req.headers.authorization

        if (tokenWithBearer) {
            let token = tokenWithBearer.split(' ')[1]

            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    return rest.status(401).send({ auth: false, message: 'Token does not registered' })
                } else {
                    if (roles == 2) {
                        req.auth = decoded
                        next()
                    } else {
                        return rest.status(401).send({ auth: false, message: 'Failed to authorizated your roles' })
                    }
                }
            })
        } else {
            return rest.status(401).send({ auth: false, message: 'There is not token there' })
        }
    }
}

module.exports = verification