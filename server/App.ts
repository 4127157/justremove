import express, { Express, Request, Response } from 'express';
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios').default;
const cors = require('cors');
const app = express();
const fs = require('fs');
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
        let converted_image:any = finalizeCalls(req.body);
        setTimeout(() => res.send({"converted": converted_image}), 1500);
    } else {
        res.status(500).send({error: "Invalid Input"});
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});

//Have to separate calls in their classes separately
function objectCutCall(body: InputBody){
    let encodedParams = new URLSearchParams();
    encodedParams.append("image_base64", body.image_data);
    encodedParams.append("to_remove", body.options.to_remove);
    encodedParams.append("output_format", "base64");
    encodedParams.append("color_removal", body.options.bg_color);

    let options = {
        method: 'POST',
        url: process.env.OBJECTCUT_URL,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': process.env.OBJECTCUT_KEY,
            'X-RapidAPI-Host': process.env.OBJECTCUT_HOST,
        },
        data: encodedParams,
    };
    
    axios.request(options)
    .then((response: any) => {
        //do something with response
    })
    .catch((error: any) => {
        //send error to frontend
    });
}

function a4aBGRCall(body: InputBody){

    let base64_MARK = ';base64,';
    let base64Index = body.image_data.indexOf(base64_MARK) + base64_MARK.length;
    let base64_true = body.image_data.substring(base64Index);
}

async function finalizeCalls(body: InputBody){
    let api = apiSelector(body.options);

    if(api === 'objectcut'){
        console.log("make objectcut call");
    }
    if(api === 'a4aBGR'){
        console.log("make a4aBGR call");
    }
    let temp= '';
    let donebool = false;
    let data = body.image_data;
    let buff =Buffer.from(data, 'base64');
    fs.writeFileSync('temporary_file', buff);
    let reader = fs.createReadStream('temporary_file', {
        flag:'a+',
        encoding: 'base64',
    });

    reader.on('data', function (chunk:any) {
        console.log('reached here');
        temp+= chunk;
    });

    reader.on('end', () => {
        console.log('value of temp is' + temp.slice(0, 40));
        return temp;
    });

    return temp;
    // return temp;
}

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
