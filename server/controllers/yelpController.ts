import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config();

interface locationObject {
	"address1": string | null,
	"address2": string | null,
	"address3": string | null,
	"city": string | null,
	"zip_code": string | null,
	"country": string | null,
	"state": string | null,
	"display_address": Array<string>
}

interface businesses {
	"id": string,
	"alias": string,
	"name": string,
	"image_url": string,
	"is_closed": Boolean,
	"url": string,
	"review_count": number,
	"categories": Array<string>,
	"rating": number,
	"coordinates": Array<number>,
	"transactions": Array<string>,
	"price": string,
	"location": locationObject,
	"phone": string,
	"display_phone": string,
	"distance": number
}

interface responseObject {
	"businesses": Array<businesses>
}

module.exports = {
	// Retrieve a set of businesses 
	async getBusiness(req: Request, res: Response) {
		try {
			const options = {
			  method: 'GET',
			  headers: {
			    accept: 'application/json',
			    Authorization: `BEARER ${process.env.YELP_API_KEY || ''}` // Must provide a non-environmental variable value otherwise we receive an overload error. I have opted for an empty string as default
			  }
			};

			const searchUrl: string = (req.body.latitude && req.body.longitude) 
			? `https://api.yelp.com/v3/businesses/search?latitude=${req.body.latitude}&longitude=${req.body.longitude}&term=${req.body.term}&sort_by=best_match&limit=20`
			: `https://api.yelp.com/v3/businesses/search?location=${req.body.location}&term=${req.body.term}&sort_by=best_match&limit=20`;
			
			const response = await fetch(searchUrl, options);
			const data: responseObject = await response.json();
			res.status(200).json(data.businesses);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
