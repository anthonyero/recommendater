import { Types } from "mongoose";
const db = require('../config/connection.ts');

// Define interfaces for each of our models
interface user {
	email: string,
	password: string,
	dates: Array<Types.ObjectId>,
	_id: Types.ObjectId,
	__v: number
}
// Due to the restaurant, activity, and dessert having the same fields, I have defined a generic 'business' interface 
interface business {
	yelpId: string,
	alias: string,
	name: string,
	imageUrl: string,
	yelpUrl: string,
	rating: number,
	reviewCount: string,
	price: string,
	latitude: number,
	longitude: number,
	city: string,
	country: string,
	state: string,
	displayAddress: Array<string>
	_id: Types.ObjectId,
	__v: number
}

interface dateRecommendation {
	user: Types.ObjectId,
	date: Date,
	location: string,
	latitude: number,
	longitude: number,
	restaurant: Types.ObjectId,
	activity: Types.ObjectId,
	dessert: Types.ObjectId,
	favorite: Boolean,
	_id: Types.ObjectId,
	__v: number
}

// Import the example data
const userData: Array<user> = require('./userData.json');
const restaurantData: Array<business> = require('./restaurantData.json');
const activityData: Array<business> = require('./activityData.json');
const dessertData: Array<business> = require('./dessertData.json');
const dateRecommendationData: Array<dateRecommendation> = require('./dateRecommendationData.json');

// Initiate connection to databse
db.once('open', async () => {
	let { User, Restaurant, Activity, Dessert, DateRecommendation } = require( '../models/'); // Declare these using let in functional scope gets past the error of const User being declared in `index.ts` from models
	let cleanDB = require('./cleanDb.ts');

	try {
		// Clean the database collections
		await cleanDB('User', 'users');
		await cleanDB('Restaurant', 'restaurants');
		await cleanDB('Activity', 'activities');
		await cleanDB('Dessert', 'desserts');
		await cleanDB('DateRecommendation', 'daterecommendations');

		// Begin seeding the database
		const users: Array<user> = await User.create(userData);
		const userIds: Array<Types.ObjectId> = users.map(user => user._id);
		console.log(userIds);

		const restaurants: Array<business> = await Restaurant.create(restaurantData);
		const restaurantIds: Array<Types.ObjectId> = restaurants.map(restaurant => restaurant._id);
		console.log(restaurantIds);

		const activities: Array<business> = await Activity.create(activityData);
		const activityIds: Array<Types.ObjectId> = activities.map(activity => activity._id);
		console.log(activityIds);

		const desserts: Array<business> = await Dessert.create(dessertData);
		const dessertIds: Array<Types.ObjectId> = desserts.map(dessert => dessert._id);
		console.log(dessertIds);

		// Promise.all with await required otherwise we have undefined because the Promise is unfulfilled/not resolved. 
		// We want to return an array of Promises so we first need to contain these operations within a single Promise and await its resolution
		// To have data correctly associated with its location, ensure that all related data points are at the same index of their respective file. 
			// For example, because San Francisco is the first city in dateRecommendationData, ensure that the first entry in restaurantData, activityData, and dessertData is also related to San Francisco
		const dateRecommendations: Array<dateRecommendation> = await Promise.all(dateRecommendationData.map(async (dateRecommendation: dateRecommendation, index: number) => {
            const recommendation: dateRecommendation = await DateRecommendation.create({
                user: userIds[index],
                restaurant: restaurantIds[index],
                activity: activityIds[index],
                dessert: dessertIds[index],
                location: dateRecommendationData[index].location,
                latitude: dateRecommendationData[index].latitude,
                longitude: dateRecommendationData[index].longitude
            });
            return recommendation;
        }));
		const dateRecommendationIds: Array<Types.ObjectId> = dateRecommendations.map( dateRecommendation => dateRecommendation._id);
		console.log(dateRecommendationIds);

		console.log('Seeding complete');
    	process.exit(0);

	} catch (err) {
		throw err;
	}
})