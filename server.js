'use strict';
const express = require('express');
const app = express();
const chatCat = require('./app');

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('views','./views'); // NOTE: This is the setting by default
app.set('view engine', 'ejs');

// Middleware functions
/*
let helloMiddleware = (req, res, next) => {
	req.hello = "Hello! It's me! I was wondering...you get the idea!";
	next(); // Pass control to the next middleware function
};
*/

app.use(chatCat.session);

app.use('/', chatCat.router);

app.listen(app.get('port'), () => {
	console.log('ChatCAT running on port: ', app.get('port'));
});