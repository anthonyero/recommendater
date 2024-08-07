import { Schema, model } from 'mongoose';

const businessSchema = new Schema({
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
		required: true, // Not all values returned form Yelp contain price. Look into either requesting user provide price information OR filtering  results to those with price information and only presenting with information
		default: 'NA' // Because not all businesses provide price information, if it is not provided, default to NA
	},
	latitude: {
		type: Number,
		min: -90,
		max: 90
	},
	longitude: {
		type: Number,
		min: -180,
		max: 180
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
	displayAddress: [
		{
			type: String,
			required: true
		}
	]
});

// Originally, I had three separate files but they all had the same schema
// I have consolidated these into a single 'business' schema and then created three models for three collections from it
const Restaurant = model('Restaurant', businessSchema);
const Activity = model('Activity', businessSchema);
const Dessert = model('Dessert', businessSchema);

module.exports = { Restaurant, Activity, Dessert };