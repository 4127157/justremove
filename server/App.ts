import express, { Express, Request, Response } from 'express';
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios').default;
const cors = require('cors');
const app = express();
const fs = require('fs');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 14);
const FormData = require("form-data");

const port = process.env.PORT;

// type InputBody = {
//     [key: string]: any,
// }

type AnyObj = {
    [key:string]: any,
};
var errorBool = false;
var errorMsg: string | any = '';

app.use(cors());//Have to reconfigure when production, unsafe otherwise, look at docs!
app.use(express.json({limit: '10mb'}));

app.get('/', (req: any, res: any) => {
    res.status(400).send('Bad Request');
});

app.post('/image', (req: any,res: any) => {
    let gateBool = bodyValidator(req.body);
    if(gateBool === true){
        let converted_image:any = finalizeCalls(req.body);
        if(errorBool === false){
            setTimeout(() => res.send({"converted": converted_image}), 1500);
        } else {
            res.status(500).send({error: errorMsg});
            errorBool = false;
            errorMsg = '';
        }
    } else {
        res.status(500).send({error: "Invalid Input"});
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});

//Have to separate calls in their classes separately
function objectCutCall(body: AnyObj){
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
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': process.env.OBJECTCUT_HOST,
        },
        data: encodedParams,
    };
    function getPrefix(str: string){
        let temp = str.slice(0, (str.indexOf(',')+1));
        return temp;
    }
    
    axios.request(options)
    .then((response: any) => {
        //do something with response
        //increment tracker in DB
        //getPrefix(body.image_data) + response.data.response.image_base64
        if(response.data.response.image_base64){
            return `${getPrefix(body.image_data)}` + `${response.data.response.image_base64}`;
        } else {
            errorBool = true;
            errorMsg = "Error occured in objectcut API call";
            return;
        }
    })
    .catch((error: any) => {
        //send error to frontend
        errorBool = true;
        errorMsg = "Error occured in objectcut API call \n" + error;
        return; 
    });
}

function a4aBGRCall(prefix:string, filename:string, fgMode: string){
    let data = new FormData();
    data.append("image", fs.createReadStream(filename));

    let options = {
        method: 'POST',
        url: process.env.A4ABGR_URL,
        params: {
            mode: fgMode,
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': process.env.A4ABGR_HOST,
            ...data.getHeaders(),
        },
        data: data,
    };

    axios.request(options)
    .then((response: any) => {
        //do something
        //delete file permanently
        //increment tracker in DB
    })
    .catch((error: any) => {
        //pass error to errorhandler to frontend
        errorBool = true;
        errorMsg = "Error occured in a4aBGR API call \n" + error;
    });

}

function finalizeCalls(body: AnyObj){
    let api = apiSelector(body.options);
    let temp: any= '';

    if(api === 'objectcut'){
        temp = objectCutCall(body);
        console.log("make objectcut call");
    }
    if(api === 'a4aBGR'){
        let a4aObj = base64ToFile(body.image_data);
        
        if(a4aObj !== 'Invalid String'
          && typeof(a4aObj) === 'object'
          && a4aObj.fName 
          && a4aObj.pFix)
        {
            a4aBGRCall(a4aObj.pFix, a4aObj.fName, body.options.fg_options);
        } else {
            errorBool = true;
            errorMsg = "Error occured in file conversion";
        }
        
        console.log("make a4aBGR call");
    }

    return temp;
}

function base64ToFile(str: string){
    let rand_str = nanoid();
    //Convert the base64 string to a file to send to a4abgr api
    let match = str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let resp: AnyObj= {};
    if(match?.length !== 3){
        return "Invalid String";
    }

    resp.type = match[1];
    resp.data = Buffer.from(match[2], 'base64');
    let tempFname = __dirname;
    let preStr = match[0].slice(0, match[0].indexOf(',')+1);
    if(resp.type === 'image/jpeg'){
        fs.writeFileSync(`./${rand_str}.jpg`, resp.data);
        tempFname += `./${rand_str}.jpg`;
    }
    if(resp.type === 'image/png'){
        fs.writeFileSync(`./${rand_str}.png`, resp.data);
        tempFname += `./${rand_str}.png`;
    }
    let retObj = {
        pFix: preStr,
        fName: tempFname,
    };
    return retObj;
    // let buff = Buffer.from(str, 'base64');
}

function apiSelector(options: AnyObj) {
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

function bodyValidator(body: AnyObj){
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
