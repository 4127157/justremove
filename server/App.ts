import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import helmet from 'helmet';
const axios = require('axios').default;
import cors from 'cors';
const app = express();
import fs from 'fs';
import mongodb from 'mongodb';
const mongoose = require('mongoose'); //Not being converted to ES6 because of TS err (no overload matches this call)
const { Schema } = mongoose;
import { customAlphabet } from 'nanoid';
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 14);
import FormData from "form-data";

import { OCCallModel } from  "./models/OC_Call_Model";
import { A4ACallModel } from "./models/A4A_Call_Model";
const db = mongoose.connection;

const port = process.env.PORT;

// type InputBody = {
//     [key: string]: any,
// }
/*TODO: 
* Full refactor
* classify every function
* purify functions
* simplify error handling, remove global error object for monolithic catch
* able to pass on response object to functions that can send res on their own*/

type AnyObj = {
    [key:string]: any,
};


app.use(helmet());
app.use(cors());//Have to reconfigure when production, unsafe otherwise, look at docs!
app.use(express.json({limit: '10mb'}));

app.get('/', (req: any, res: any) => {
    res.status(400).send('Bad Request');
});

app.post('/image', (req: any,res: any) => {
    let gateBool = bodyValidator(req.body);
    if(gateBool === true){
    connectDB()
    .catch(e => {
        handleError(e, res)
        .catch(e => {
            console.error(`[server] Error in connection to DB ${e}`);
        });
    });
    db.on("error", () => {
        console.error.bind(console, "[database]: MongoDB Connection Error");
        handleError("[database]: MongoDB Connection Error", res);
    });
    db.once("open", () => {
        console.log("[database]: connection to database successful");
        finalizeCalls(req.body, res);
    });
        //if(errorBool === false){
        //    //setTimeout(() => res.send({"converted": converted_image}), 1500);
        //    setTimeout(() => res.send({"error": "placeholder error for DB test"}), 1500);
        //} else {
        //    console.log("Connection error reaching");
        //    res.status(500).send({error: errorMsg});
        //    errorBool = false;
        //    errorMsg = '';
        //}
    } else {
        handleError("Invalid input", res).catch(e => {
            console.log("[server]: An error occured");
            console.error(`[server]: ${e}`);
        });
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});

// const CallTrackerSchema = new Schema({
//     name: String,
//     calls_month: Number,
//     calls_total: Number,
//     last_call_date: Date,
//     reset_date: Date,
// }); //If today is reset date then calls_month = 0, reset_date += 30 days

// const TrackerModel = mongoose.model("TrackerModel", CallTrackerSchema);

// const OC_instance = new TrackerModel({<properties go here>});
// const A4A_instance = new TrackerModel({<properties go here>});
// ^^ Each data call function to utilise these to change the record in the
// functions each.

async function handleError(err: any, res:any) {
    res.status(500).send("An error occured:" + err);
    throw new Error(err);
}
async function connectDB(){
    const username = encodeURIComponent(process.env.MONGO_USERNAME as string);
    const password = encodeURIComponent(process.env.MONGO_PASSWORD as string);
    const dbCluster = process.env.MONGO_CLUSTER;
    const dbName = process.env.MONGO_DBNAME;
    const mongoURI = `mongodb+srv://${username}:${password}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;
    await mongoose
    .connect(mongoURI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );
}

function docDBUpdate(num:number){
    let doc_name;
    if(num === 1){
        //Find in OCCallModel name "OC_Call"
        //Update with findOneAndUpdate or separate update 
        OCCallModel.findOne({name: "OC_Call"}, (err: any, oc_call: any) => {
            console.log(oc_call);
        });

    } else {
        //Find in A4ACallModel name "A4A_Call"
        //Update with findOneAndUpdate or separate update function
        A4ACallModel.findOne({name: "A4A_Call"}, (err: any, a4a_call: any) => {
            console.log(a4a_call);
        });
    }
    //get the objectcut document
    //update the calls month and calls_total
    //check for reset date and update if necessary

}

//Have to separate calls in their classes separately
function objectCutCall(body: AnyObj, res: any){
    docDBUpdate(1);
    //let encodedParams = new URLSearchParams();
    //encodedParams.append("image_base64", body.image_data);
    //encodedParams.append("to_remove", body.options.to_remove);
    //encodedParams.append("output_format", "base64");
    //encodedParams.append("color_removal", body.options.bg_color);

    //let options = {
    //    method: 'POST',
    //    url: process.env.OBJECTCUT_URL,
    //    headers: {
    //        'content-type': 'application/x-www-form-urlencoded',
    //        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    //        'X-RapidAPI-Host': process.env.OBJECTCUT_HOST,
    //    },
    //    data: encodedParams,
    //};
    //function getPrefix(str: string){
    //    let temp = str.slice(0, (str.indexOf(',')+1));
    //    return temp;
    //}
    
    //axios.request(options)
    //.then((response: any) => {
    //    //do something with response
    //    //increment tracker in DB
    //    //getPrefix(body.image_data) + response.data.response.image_base64
    //    if(response.data.response.image_base64){
    //        return `${getPrefix(body.image_data)}` + `${response.data.response.image_base64}`;
    //    } else {
    //        errorBool = true;
    //        errorMsg = "Error occured in objectcut API call";
    //        return;
    //    }
    //})
    //.catch((error: any) => {
    //    //send error to frontend
    //    errorBool = true;
    //    errorMsg = "Error occured in objectcut API call \n" + error;
    //    return; 
    //});
}

function a4aBGRCall(prefix:string, filename:string, fgMode: string, res:any){
    docDBUpdate(2);
    //let data = new FormData();
    //data.append("image", fs.createReadStream(filename));

    //let options = {
    //    method: 'POST',
    //    url: process.env.A4ABGR_URL,
    //    params: {
    //        mode: fgMode,
    //    },
    //    headers: {
    //        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    //        'X-RapidAPI-Host': process.env.A4ABGR_HOST,
    //        ...data.getHeaders(),
    //    },
    //    data: data,
    //};

    //axios.request(options)
    //.then((response: any) => {
    //    //do something
    //    //delete file permanently
    //    //increment tracker in DB
    //})
    //.catch((error: any) => {
    //    //pass error to errorhandler to frontend
    //    //delete file permanently
    //    errorBool = true;
    //    errorMsg = "Error occured in a4aBGR API call \n" + error;
    //});

}

function finalizeCalls(body: AnyObj, res:any){
    let api = apiSelector(body.options);
    let temp: any= '';

    if(api === 'objectcut'){
        objectCutCall(body, res);
        //temp = objectCutCall(body);
        console.log("make objectcut call");
    }
    if(api === 'a4aBGR'){
        a4aBGRCall('','','', res);
        // let a4aObj = base64ToFile(body.image_data);
        
        // if(a4aObj !== 'Invalid String'
        //   && typeof(a4aObj) === 'object'
        //   && a4aObj.fName 
        //   && a4aObj.pFix)
        // {
        //     a4aBGRCall(a4aObj.pFix, a4aObj.fName, body.options.fg_options);
        // } else {
        //     errorBool = true;
        //     errorMsg = "Error occured in file conversion";
        // }
        
        console.log("make a4aBGR call");
    }

    return temp;
}

function base64ToFile(str: string, res: any){
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
