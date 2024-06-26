import express, { Express, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config() // Allows us to access environmental variables locally. Can be written on one line as in `connection.ts`

const PORT = process.env.PORT || 3001;
const app: Express = express();
const db = require('./config/connection')

const startServer = () => {
	// Middleware
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use(express.static(path.join(__dirname, '../client/dist')))
	// app.use(routes)

	app.get("/test", (req: Request, res: Response) => {
	  res.send("Express + TypeScript Server");
	});

	// For production deployment 
	if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/dist')));
	}

	db.once('open', () => {
		app.listen(PORT, () => {
	  	console.log(`API server running on port ${PORT}`);
		});
	});
};

startServer();



