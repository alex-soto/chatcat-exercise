'use strict';
module.exports = (io, app) => {
	let allrooms = app.locals.chatroom;
	io.of('/roomslist').on('connection', socket => {
	    console.log("Socket.io connected to client!");
	});
}