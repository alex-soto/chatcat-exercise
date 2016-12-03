'use strict';
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views','./views'); // NOTE: This is the setting by default
app.set('view engine', 'ejs');

// Middleware functions
let helloMiddleware = (req, res, next) => {
	req.hello = "Hello! It's me! I was wondering...you get the idea!";
	next(); // Pass control to the next middleware function
};

app.get('/', (req, res, next) => {
	//res.sendFile(__dirname + '/views/login.htm');
	res.render('login');
});

app.listen(app.get('port'), () => {
	console.log('ChatCAT running on port: ', app.get('port'));
});