const yelpRouter = require('express').Router();
const {
	getBusiness
} = require('../../controllers/yelpController') // Removed the hardcoded .ts extension which was creating errors when built and using npm run start 

// Endpoint is '/api/yelp/search'
yelpRouter.route('/search')
	.get(getBusiness)

module.exports = yelpRouter;