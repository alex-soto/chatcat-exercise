'use strict';

// social authentication logic
require('./auth')();

// Create an IO server instance
let ioServer = app => {
	app.locals.chatroom = [];
	const server = require('http').Server(app);
	const io = require('socket.io')(server);
	require('./socket')(io, app);
	return server;
}

module.exports = {
	router: require('./routes')(),
	session: require('./session'),
	ioServer
};