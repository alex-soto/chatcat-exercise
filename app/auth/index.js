'use strict';
const passport = require('passport');
const config = require('../config');
const util = require('../utilities');
const FacebookStrategy = require('passport-facebook').strategy;

module.exports = () => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	
	passport.deserializeUser((id, done) => {
		//  Find the user with matching _id
		util.findById(id)
			.then(user => {
				done(null, user);
			})
			.catch(error => console.log("Error when deserializing user"));
	});
	
	let authProcessor = (accessToken, refreshToken, profile, done) => {
		// Find user data in the local db using profile.id
		// If the user is found, return the user data by invoking done()
		// If not found, create user in local db and return data with done()
		util.findOne(profile.id)
			.then(result => {
				if(result){ // if findOne returns user data
					done(null, result) // done() params: err, mongoDB result
				} else { // else if user data not found, create user in db
					// Create new user and return
					util.createNewUser(profile)
						.then(newChatUser => done(null, newChatUser))
						.catch(error => console.log("Error when creating new user"));
				}
				
			});
	};
	
	passport.use(new FacebookStrategy(config.fb, authProcessor));
};