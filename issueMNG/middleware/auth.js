var jwt = require('jsonwebtoken');
var userRepository = require('../model/user');
var config = require('../config/config')

const AUTH_ERROR = { message: '로그인을 해주세요!!' };

module.exports.isAuth = async (req, res, next) => {
    // const authHeader = req.get('Authorization');
    // if (!(authHeader && authHeader.startsWith('Bearer '))) {
    //     return res.status(401).json(AUTH_ERROR);
    // }
    //
    // const token = authHeader.split(' ')[1];

    const token = req.cookies.ims;
    // console.log(token);
    // TODO: Make it secure!
    jwt.verify(
        token,
        `${config.jwtInfo.jwtSecretKey}`,
        async (error, decoded) => {
            if (error) {
                res.render('signIn', { title: 'Express' });
                // return res.status(401).json(AUTH_ERROR);
            }
            const user = await userRepository.findOne({_id:decoded._id});
            if (!user) {
                res.render('signIn', { title: 'Express' });
                // return res.status(401).json(AUTH_ERROR);
            }
            req.username = user.username; // req.customData
            next();
        }
    );
};
