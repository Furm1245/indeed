const express = require('express');

const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.get('/user/:id', usersController.getUsers);

router.post('/register', usersController.register);

router.post('/login', usersController.login);


module.exports = router;
