import express, { Express, Request, Response } from 'express';
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT ;

app.get('/', (req, res) => {
    res.send('Hello world!')
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
