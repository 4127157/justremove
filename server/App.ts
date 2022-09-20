import express, { Express, Request, Response } from 'express';
const dotenv = require('dotenv');

dotenv.config();

const app: Express = express();
const port = process.env.PORT ;

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
