const apiRouter = require('express').Router();
const yelpRoutes = require('./yelpRoutes'); // Removed the hardcoded .ts extension which was creating errors when built and using npm run start 
const userRoutes = require('./userRoutes.ts');

apiRouter.use('/yelp', yelpRoutes);
apiRouter.use('/user', userRoutes)

module.exports = apiRouter;