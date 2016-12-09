'use strict';
const util = require('../utilities');

module.exports = (io, app) => {
	let allrooms = app.locals.chatroom;
	
	io.of('/roomslist').on('connection', socket => {
		
	    socket.on('getChatRooms', () => {
	        socket.emit('chatRoomsList', JSON.stringify(allrooms));
	    });
	    
	    socket.on('createNewRoom', newRoomInput => {
	    	// Check to see if the new room name is a duplicate of an existing room
	    	if(!util.findRoomByName(allrooms, newRoomInput)){
	    		// If room name is unique, add it to the rooms array and then broadcast to users
	    		allrooms.push({
	    			room: newRoomInput,
	    			roomID: util.randomHex(),
	    			users: []
	    		});
	    		
	    		// Emit an updated chatroom list to the creator
	    		socket.emit('chatRoomsList', JSON.stringify(allrooms));
	    		
	    		// Emit an updated chatroom list to everyone
	    		socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
	    	}
	    	
	    });
	});
}