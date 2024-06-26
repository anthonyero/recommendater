import express, { Express, Request, Response } from 'express';
import path from 'path';

const PORT = process.env.PORT || 3001;
const app: Express = express();

// Middelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')))
// app.use(routes)

// // For production deployment 
// if (process.env.NODE_ENV === 'production') {
// app.use(express.static(path.join(__dirname, '../client/dist')));

// }

app.get("/test", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});