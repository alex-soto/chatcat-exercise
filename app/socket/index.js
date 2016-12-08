'use strict';
module.exports = (io, app) => {
	let allrooms = app.locals.chatroom;
	
	allrooms.push({
	    room: 'Good Food',
	    roomID: '0001',
	    users: []
	});
	
	allrooms.push({
	    room: 'Cloud computing',
	    roomID: '0002',
	    users: []
	});
	
	io.of('/roomslist').on('connection', socket => {
	    socket.on('getChatRooms', () => {
	        socket.emit('chatRoomsList', JSON.stringify(allrooms));
	    });
	});
}