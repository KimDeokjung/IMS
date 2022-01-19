var jwt = require('jsonwebtoken');
var userRepository = require('../model/user');
var config = require('../config/config')

const AUTH_ERROR = { message: 'Authentication Error' };

module.exports.isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];
    // TODO: Make it secure!
    jwt.verify(
        token,
        `${config.jwtInfo.jwtSecretKey}`,
        async (error, decoded) => {
            if (error) {
                return res.status(401).json(AUTH_ERROR);
            }
            const user = await userRepository.findOne({_id:decoded._id});
            if (!user) {
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user._id; // req.customData
            next();
        }
    );
};
