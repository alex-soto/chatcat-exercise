'use strict';
const util = require('../utilities');
const passport = require('passport');
const config = require('../config');

module.exports = () => {
	let routes = {
		'get': {
			'/': (req, res, next) => {
				res.render('login');
			},
			'/rooms': [util.isAuthenticated, (req, res, next) => {
				res.render('rooms', {
					user: req.user,
					host: config.host
				});
			}], 
			'/chat': [util.isAuthenticated, (req, res, next) => {
				res.render('chatroom', {
					user: req.user,
					host: config.host
				});
			}],
			'/getsession': (req, res, next) => {
				res.send("My favorite color: " + req.session.favColor);
			},
			'/setsession': (req, res, next) => {
				req.session.favColor = "blue";
				res.send("Session set");
			},
			'/auth/facebook': passport.authenticate('facebook'),
			'/auth/facebook/callback': passport.authenticate('facebook', {
				successRedirect: '/rooms',
				failureRedirect: '/'
			}),
			'/auth/twitter': passport.authenticate('twitter'),
			'/auth/twitter/callback': passport.authenticate('twitter', {
				successRedirect: '/rooms',
				failureRedirect: '/'
			}),
			'/logout': (req, res, next) => {
				req.logout();
				res.redirect('/');
			}
		},
		'/post': {
			
		},
		'NA': (req, res, next) => {
			res.status(404).sendFile(process.cwd() + '/views/404.htm');
		}
	}
	
	return util.route(routes);
};