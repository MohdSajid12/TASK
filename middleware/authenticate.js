const jwt = require('jsonwebtoken');
const User = require('../model/signup');

const authenticate = (req, res, next) => {

    try {
        const token = req.header('authorization');
        console.log(token);
        const userid = Number(jwt.verify(token, 'cd622d0fbbf5aabf249e3579c0df3ab4382a2e291a3e9c26cba770f53a9bd33c2b75d1f2c4b585b3ac951e3704cf850d705e23430d1cf9a107e2b349d3172d91'
        ));
        User.findByPk(userid).then(user => {
            console.log(JSON.stringify(user));
            req.user = user;
            next();
        }).catch(err => { throw new Error(err)})

      } catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
      }

}

module.exports = {
    authenticate
}