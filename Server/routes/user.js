const express = require('express');
const router = require('express-promise-router')();

const UserController = require('../controllers/user');

router.route('/val')
    .post(UserController.setCookie);

router.route('/home')
    .get(UserController.validAuth);

router.route('/home/dados')
    .get(UserController.userGetDados);


module.exports = router;