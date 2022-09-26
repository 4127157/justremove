import express, { Express, Request, Response } from 'express';
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios').default;
const cors = require('cors');
const app = express();
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const port = process.env.PORT;


app.use(cors()); //Have to reconfigure when production, unsafe otherwise, look at docs!

app.get('/', (req, res) => {
    res.send('GET Request');
    //res.json({});
});

app.post('/', (req,res) => {
    res.send('POST Request');
});

app.put('/', (req,res) => {
    res.send('PUT Request');
});

app.put('/image', (req,res) => {
    res.send('PUT Request with image data');
});

app.post('/image', (req,res) => {
    res.send('POST Request with image data');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
