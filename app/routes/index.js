'use strict';
const routeUtil = require('../utilities');

module.exports = () => {
	let routes = {
		'get': {
			'/': (req, res, next) => {
				res.render('login');
			},
			'/rooms': (req, res, next) => {
				res.render('rooms');
			}, 
			'/chat': (req, res, next) => {
				res.render('chatroom');
			}
		},
		'/post': {
			
		}
	}
	
	return routeUtil.route(routes);
};