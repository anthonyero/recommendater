import { Schema, model } from 'mongoose';
const User = require('./User.ts');

const dateRecommendationSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	},
	location: {
		type: String,
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
	restaurant: {
		type: Schema.Types.ObjectId,
		ref: 'Restaurant'
		// Not making these required to allow user flexibility to select only fields of interest
	},
	activity: {
		type: Schema.Types.ObjectId,
		ref: 'Activity'
	},
	dessert: {
		type: Schema.Types.ObjectId,
		ref: 'Dessert'
	},
	favorite: {
		type: Boolean,
		default: false
	}
});

const DateRecommendation = model('dateRecommendation', dateRecommendationSchema);

module.exports = DateRecommendation;