'use strict';
module.exports = (io, app) => {
	let allrooms = app.locals.chatroom;
	
	io.of('/roomslist').on('connection', socket => {
	    socket.on('getChatRooms', () => {
	        socket.emit('chatRoomsList', JSON.stringify(allrooms));
	    });
	});
}