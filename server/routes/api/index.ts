const apiRouter = require('express').Router();
const yelpRoutes = require('./yelpRoutes'); // Removed the hardcoded .ts extension which was creating errors when built and using npm run start 

apiRouter.use('/yelp', yelpRoutes);

module.exports = apiRouter;