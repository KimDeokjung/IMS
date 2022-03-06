const path = require('path')
require('dotenv').config({path:path.join('..','.env')});

module.exports = {
  database:{
    "mongooseID": process.env.mongooseID,
    "mongoosePW": process.env.mongoosePW,
    "serverURL" : process.env.databaseURL
  },
  jwtInfo: {
    "jwtSecretKey": process.env.JWT_SECRET,
    "jwtExpiresInDays": process.env.JWT_EXPIRES_SEC
  },
  bcryptInfo: {
    "bcryptSaltRounds": process.env.BCRYPT_SALT_ROUNDS
  }
}

