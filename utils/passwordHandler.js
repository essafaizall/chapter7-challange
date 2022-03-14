const bcryptjs = require('bcryptjs')
module.exports ={
    hashPassword(password){
        return bcryptjs.hashSync(password,15)
    },
    comparePassword(password, passwordHash){
        return bcryptjs.compareSync(password, passwordHash)
    }
}