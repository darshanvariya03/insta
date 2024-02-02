const express = require('express');

const routes = express.Router();

const passport = require('passport');

const indexController = require('../controller/indexController');


routes.get('/',indexController.index);
routes.get('/register',indexController.register);
routes.post('/registerUser',indexController.registerUser);
routes.post('/login',passport.authenticate('local',{failureRedirect : '/'}),indexController.login);
routes.get('/dashbord',passport.checkUser,indexController.dashbord);


module.exports = routes