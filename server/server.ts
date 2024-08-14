import express, { Express, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
const routes = require('./routes');
dotenv.config() // Allows us to access environmental variables locally. Can be written on one line as in `connection.ts`

const cors = require('cors')
const PORT = process.env.PORT || 3001;
const app: Express = express();
const db = require('./config/connection')

const startServer = () => {
	// Middleware
	app.use(cors())
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	// app.use(express.static(path.join(__dirname, '../../client/dist')))
	app.get("/api/text", (req: Request, res: Response) => {
	  res.json({'text': 'Express + TypeScript Server'});
	}); 
	app.use(routes)

	// For production deployment 
	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, '../../client/dist'))); // Requires shifting two levels up because we are deploying from the 'dist' sub-directory
		
		app.get('*', (req: Request, res: Response) => {
			res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
		})
	}

	// Evaluate if this is best implemented through the API server or React's router 
	// app.use('*', (req: Request, res: Response) => {
	// 		res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
	// 	})
	
	db.once('open', () => {
		app.listen(PORT, () => {
	  	console.log(`API server running on port ${PORT}`);
		});
	});
};

startServer();