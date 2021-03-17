const express = require('express');
const router = require('express-promise-router')();

const DispController = require('../controllers/dispositivo');

router.route('/')
    .post(DispController.index);


router.route('/:id')
    .post(DispController.postDados)
    .get(DispController.getDados);

module.exports = router;