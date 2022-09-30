import express, { Express, Request, Response } from 'express';
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios').default;
const cors = require('cors');
const app = express();
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const port = process.env.PORT;

type InputBody = {
    [key: string]: any,
}

app.use(cors());//Have to reconfigure when production, unsafe otherwise, look at docs!
app.use(express.json({limit: '10mb'}));

app.get('/', (req: any, res: any) => {
    res.status(400).send('Bad Request');
});

app.post('/image', (req: any,res: any) => {
    let gateBool = bodyValidator(req.body);
    if(gateBool === true){
        setTimeout(() => res.send({"converted": req.body.image_data}), 1500);
    } else {
        res.status(500).send({error: "Invalid Input"});
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});

function apiSelector(options: InputBody) {
    if(options.to_remove === 'foreground'){
        return 'objectcut'; //https://rapidapi.com/objectcut.api/api/background-removal
    }
    if(options.bg_color === 'white' 
        && options.to_remove === 'background'){
        return 'objectcut';
    }
    if(options.bg_color === 'transparent'
        && options.to_remove === 'background'
        && (options.fg_options === '' || options.fg_options === 'fg-image')){
        return 'objectcut';
    }
    return 'a4aBGR'; //https://rapidapi.com/api4ai-api4ai-default/api/background-removal4    
}

function bodyValidator(body: InputBody){
    let checker = 0;
    
    if(typeof(body) === 'object'){
        checker++;
    }

    if(body.options) {
        checker++;
    }

    if(body.image_data && typeof(body.image_data) === 'string'){
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
    return checker == 6 ? true : false;
}
