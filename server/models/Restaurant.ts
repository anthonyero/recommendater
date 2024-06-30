import { Schema, model } from 'mongoose';

const restaurantSchema = new Schema({
	yelpId: {
		type: String,
		required: true
	},
	alias: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
		required: true,
		match: [/(?:http[s]?:\/\/.)?(?:www\.)?[-a-zA-Z0-9@%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/, 'Must match a URL']
	},
	yelpUrl: {
		type: String,
		required: true,
		match: [/(?:http[s]?:\/\/.)?(?:www\.)?[-a-zA-Z0-9@%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/, 'Must match a URL']
	},
	rating: {
		type: Number,
		required: true
	},
	reviewCount: {
		type: Number,
		required: true
	},
	price: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	country: {
		type: String, 
		required: true
	},
	state: {
		type: String, 
		required: true
	},
	displayAddress: {
		type: String,
		required: true
	}
});

const Restaurant = model('restaurant', restaurantSchema);

module.exports = Restaurant;