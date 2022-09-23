import express, { Express, Request, Response } from 'express';
const dotenv = require('dotenv');


dotenv.config();

const cors = require('cors');
const app = express();
const port = process.env.PORT ;

app.use(cors());

app.get('/', (req, res) => {
    res.send('GET Request')
});

app.post('/', (req,res) => {
    res.send('POST Request');
});


app.put('/', (req,res) => {
    res.send('PUT Request');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
