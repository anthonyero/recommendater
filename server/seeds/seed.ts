import { Types } from "mongoose";
const db = require('../config/connection.ts');

// Import the example data
const userData = require('./userData.json');
const restaurantData = require('./restaurantData.json');
const activityData = require('./activityData.json');

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

// const cleanDB = require('./cleanDb.ts');

db.once('open', async () => {
	let { User, Restaurant, Activity } = require( '../models/'); // Declare these using let in functional scope gets past the error of const User being declared in `index.ts` from models
	let cleanDB = require('./cleanDb.ts');

	try {
		// Clean the database collections
		await cleanDB('User', 'users')
		await cleanDB('Restaurant', 'restaurants')
		await cleanDB('Activity', 'activities')

		// Begin seeding the database
		const users: Array<user> = await User.create(userData);
		const userIds: Array<Types.ObjectId> = users.map(user => user._id)
		console.log(userIds);

		const restaurants: Array<business> = await Restaurant.create(restaurantData);
		const restaurantIds: Array<Types.ObjectId> = restaurants.map(restaurant => restaurant._id)
		console.log(restaurantIds)

		const activities: Array<business> = await Activity.create(activityData);
		const activityIds: Array<Types.ObjectId> = activities.map(activity => activity._id)
		console.log(activityIds)

		console.log('Seeding complete');
    	process.exit(0);

	} catch (err) {
		throw err;
	}
})