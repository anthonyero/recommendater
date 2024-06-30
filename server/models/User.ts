import { Schema, model } from 'mongoose';
const DateRecommendation = require('./DateRecommendation.ts')
 
const userSchema = new Schema ({
	email: {
		type: String,
		required: true, 
		unique: true,
		match: [/.+@.+\..+/, 'Must match an email address!']
	},
	password: {
		type: String,
		required: true, 
	}, 
	dates: [
		{
			type: Schema.Types.ObjectId,
			ref: 'DateRecommendation'	
		}
	]
});

// If we build our own authentication, we will define a 'pre' middleware to salt and hash the password using bycrpt
// We would also require the `isCorrectPassword` function
// As I am interested in using Auth0, must review documentation

const User = model('user', userSchema)

module.exports = User;