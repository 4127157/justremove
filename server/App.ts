import express, { Express, Request, Response } from 'express';
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios').default;
const cors = require('cors');
const app = express();
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const port = process.env.PORT;

app.use(cors());//Have to reconfigure when production, unsafe otherwise, look at docs!
app.use(express.json({limit: '10mb'}));

app.get('/', (req: any, res: any) => {
    res.status(400).send('Bad Request');
});

app.post('/image', (req: any,res: any) => {
    res.send({"converted": req.body.image_data});
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
