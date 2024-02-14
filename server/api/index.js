const client = require('../db/client');

const router = require('express').Router();

router.use('/users', require('./users'));

router.use('/events', require('./events'));

module.exports = router;
