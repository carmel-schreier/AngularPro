var express = require('express');
var router = express.Router();
const mwAuth = require('../middleware/auth');
const auth = require('../controllers/auth');

router.options('*', function (req, res, next) {
  res.send();
});

router.post('/login', auth.login);
router.get('/refresh', auth.getUser)


router.post('/register', auth.registerUser);


//router.get('/logout', mwAuth, function (req, res, next) {
//  return res
//    .clearCookie('access_token')
//    .status(200)
//    .send('Successfully logged out.');
//})

module.exports = router;