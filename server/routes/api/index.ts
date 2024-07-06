const apiRouter = require('express').Router();
const yelpRoutes = require('./yelpRoutes.ts');

apiRouter.use('/yelp', yelpRoutes);

module.exports = apiRouter;