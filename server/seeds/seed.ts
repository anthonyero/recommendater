import { Types } from "mongoose";

const db = require('../config/connection.ts');
// const { User } = require( '../models/');
// Import the example data
const userData = require('./userData.json');
const restaurantData = require('./restaurantData.json');

interface user {
	email: string,
	password: string,
	dates: Array<Types.ObjectId>,
	_id: Types.ObjectId,
	__v: number
}

interface restaurant {
	yelpId: string,
	alias: string,
	name: string,
	imageUrl: string,
	yelpUrl: string,
	rating: number,
	reviewCount: string,
	price: string,
	city: string,
	country: string,
	state: string,
	displayAddress: Array<string>
	_id: Types.ObjectId,
	__v: number
}

// const cleanDB = require('./cleanDb.ts');

db.once('open', async () => {
	let { User, Restaurant } = require( '../models/'); // Declare these using let in functional scope gets past the error of const User being declared in `index.ts` from models
	let cleanDB = require('./cleanDb.ts');

	try {
		// Clean the database collections
		await cleanDB('User', 'users')
		await cleanDB('Restaurant', 'restaurants')

		// Begin seeding the database
		const users: Array<user> = await User.create(userData);
		const userIds: Array<Types.ObjectId> = users.map(user => user._id)
		console.log(userIds);

		const restaurants: Array<restaurant> = await Restaurant.create(restaurantData);
		const restaurantIds: Array<Types.ObjectId> = restaurants.map(restaurant => restaurant._id)
		console.log(restaurantIds)

		console.log('Seeding complete');
    	process.exit(0);

	} catch (err) {
		throw err;
	}
})