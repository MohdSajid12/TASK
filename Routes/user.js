const express = require('express');

const userController = require('../controller/user');
const middleware = require('../middleware/authenticate');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/users', middleware.authenticate ,userController.getAllUsers);

module.exports = router;