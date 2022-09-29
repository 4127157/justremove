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
    console.log(req.body.options);
    let gateBool = bodyValidator(req.body);
    if(gateBool === true){
        setTimeout(() => res.send({"converted": req.body.image_data}), 1500);
    } else {
        res.send({error: "Invalid Input"});
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});

type InputBody = {
    [key: string]: any,
}

function bodyValidator(body: InputBody){
    console.log(typeof(body.image_data));
    let checker = 0;
    
    if(typeof(body) === 'object'){
        checker++;
    }

    if(body.options) {
        checker++;
    }

    if(body.image_data){
        checker++;
    }

    if(body.options.to_remove === 'foreground' 
        || body.options.to_remove === 'background'){
        checker++;
    }

    if(body.options.bg_color === 'white' 
        || body.options.bg_color === 'transparent'){
        checker++;
    }

    if(body.options.fg_options === ''
        || body.options.fg_options === 'fg-image'
        || body.options.fg_options === 'fg-image-shadow'
        || body.options.fg_options === 'fg-image-hideclp'
        || body.options.fg_options === 'fg-image-shadow-hideclp'
        || body.options.fg_options === 'fg-mask'){
        
        checker++;
    }
    console.log(checker);
    return true;
}
