const yelpRouter = require('express').Router();
const {
	getBusiness
} = require('../../controllers/yelpController.ts')

// Endpoint is '/api/yelp/search'
yelpRouter.route('/search')
	.get(getBusiness)

module.exports = yelpRouter;