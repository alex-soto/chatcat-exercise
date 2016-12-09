'use strict';
const util = require('../utilities');

module.exports = (io, app) => {
	let allrooms = app.locals.chatrooms;
	
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
	
	io.of('/chatter').on('connection', socket => {
		socket.on('join', data => {
			let usersList = util.addUserToRoom(allrooms, data, socket);
			// console.log("socket/index.js -> usersList: ", usersList);
			// Update the list of active users as shown on the chatroom page
			socket.broadcast.to(data.roomID).emit('updateUsersList', JSON.stringify(usersList.users));
			// Preceding code broadcasts to all users EXCEPT socket that triggered the event
			// Following code emits event to the socket where the event originated
			socket.emit('updateUsersList', JSON.stringify(usersList.users));
		});
	});
}