'use strict';
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

// Middleware functions
let helloMiddleware = (req, res, next) => {
	req.hello = "Hello! It's me! I was wondering...you get the idea!";
	next(); // Pass control to the next middleware function
};

app.use('/dashboard',helloMiddleware);

// Create routes
app.get('/', (req, res, next) => {
	res.send('<h1>Hello Express!</h1>');
	console.log(req.hello);
});
app.get('/dashboard', (req, res, next) => {
	res.send('<h1>This is the dashboard page! Middleware says: ' + req.hello + '</h1>');
});

app.listen(app.get('port'), () => {
	console.log('ChatCAT running on port: ', app.get('port'));
});