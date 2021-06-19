const express = require('express');
const router = new express.Router;

router.get('/', (req, res) =>
{
	res.send('ok');
});

// Collections
const FizzBuzzJazz = require('./collections/fizzbuzzjazz/FizzBuzzJazz');

router.get('/fizzbuzzjazz/:id', FizzBuzzJazz.Generate);

const Logs = require('./collections/logs/controllers/Log');

router.get('/logs', Logs.Read);

module.exports = router;