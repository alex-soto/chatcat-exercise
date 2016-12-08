'use strict';

if (process.env.NODE_ENV === 'production'){
	// Offer production stage environment variables
	// mLab URI:
	// "mongodb://chatcatuser:P4SSW0rd0865@ds119578.mlab.com:19578/mychatcatdb-as"
	module.exports = {
		host: process.env.host || "",
		dbURI: process.env.dbURI,
		sessionSecret: process.env.sessionSecret,
		fb: {
			clientID: process.env.fbClientID,
			clientSecret: process.env.fbClientSecret,
			callbackURL: process.env.host + "/auth/facebook/callback",
			profileFields: ["id","displayName","photos"]
		},
		twitter: {
			consumerKey: process.env.twConsumerKey,
			consumerSecret: process.env.twConsumerSecret,
			callbackURL: process.env.host + "/auth/twitter/callback",
			profileFields: ["id","displayName","photos"]
		}
	}
} else {
	var devConfig = require('./development.js');
	module.exports = devConfig;
}