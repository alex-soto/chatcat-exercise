'use strict';

if (process.env.NODE_ENV === 'production'){
	// Offer production stage environment variables
	// mLab URI:
	// "mongodb://chatcatuser:P4SSW0rd0865@ds119578.mlab.com:19578/mychatcatdb-as"
	module.exports = {
		host: process.env.host || "",
		dbURI: process.env.dbURI,
		sessionSecret: process.env.sessionSecret
	}
} else {
	module.exports = require('./development.json');
}