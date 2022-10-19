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
import { update } from 'lodash';
const db = mongoose.connection;

const port = process.env.PORT;
const OBJECTCUT_LIMIT = 50;
const A4A_LIMIT = 25;

// type InputBody = {
//     [key: string]: any,
// }
/*TODO: 
* Full refactor
* classify every function
* purify functions
* Implement URL based conversions
* Ideally but optionally implement body segmentation locally (virtually unlimited calls):  https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation
* ^^^^ Could be a separate API altogether */

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
            //finalizeCalls(req.body, res);
        });

        // setTimeout( () => res.send({converted: req.body.image_data}), 2000);
        setTimeout( () => tempFileSend(req.body.image_data, res), 2000);

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

function tempFileSend(str: string, res: any){
    let obj  = base64ToFile(str, res);
    if(typeof(obj) === 'object'){
        try {
        res.sendFile(obj.fName);
        } catch(e: any) {
            // if(typeof(obj) === 'object'){
            //     fs.unlinkSync(obj.fName);
            // } //redundancy due to redundant TS Error (property does not exist on type despite check)
            handleError(e, res);
        }
        // fs.unlinkSync(obj.fName);
    } else {
        handleError(obj, res);
    }
    return;
}

async function handleError(err: any, res:any) {
    console.error(err);
    res.status(500).send({"error" : `An error occured: ${err}`});
    // throw new Error(err);
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

async function docDBUpdate(num:number, res: any){
    if(num === 1){
        //Find in OCCallModel name "OC_Call"
        //Update with findOneAndUpdate or separate update 
        let filter = { name: "OC_Call" };
        let doc = await OCCallModel.findOne(filter);
        let updateObj = update(doc);
        await OCCallModel.findOneAndUpdate(filter, updateObj, { new: true })
        .then((result: any) => {
            console.log(result);
            return;
        })
        .catch((e: any) => {
            handleError(e, res).catch(e => console.error(`[database]: ${e}`));
            return;
        });

    } else {
        //Find in A4ACallModel name "A4A_Call"
        //Update with findOneAndUpdate or separate update function
        let filter = { name: "A4A_Call" };
        let doc = await A4ACallModel.findOne(filter);
        let updateObj = update(doc);
        await A4ACallModel.findOneAndUpdate(filter, updateObj, { new: true })
        .then((result: any) => {
            console.log(result);
            return;
        })
        .catch((e: any) => {
            handleError(e, res).catch(e => console.error(`[database]: ${e}`));
            return;
        });
    }

    function update(doc:any){
        let daysPassed = Math.ceil((new Date().getTime() - new Date(doc.reset_date).getTime())/(1000*3600*24));
        let retObj: AnyObj = {};
        retObj.calls_total = ((doc.calls_total) + 1);
        retObj.last_call_date = Date.now();
        if(daysPassed < 30){
            retObj.calls_month = ((doc.calls_month) + 1);
        } else {
            retObj.calls_month = 1;
            retObj.reset_date = Date.now();
        }
        return retObj;
    }
}

async function checkDBAvailability(num: number){
    if(num === 1) {
        let filter = { name: "OC_Call" };
        let doc = await OCCallModel.findOne(filter);
        if(doc.calls_month <= OBJECTCUT_LIMIT){
            return true;
        } else {
            throw new Error("API Calls exhausted: ObjectCut. Try different options");
        }
    } else {
        let filter = { name: "A4A_Call" };
        let doc = await A4ACallModel.findOne(filter);
        if(doc.calls_month <= A4A_LIMIT){
            return true;
        } else {
            throw new Error("API Calls exhausted: A4ABGR. Try different options");
        }
    }
}

//Have to separate calls in their classes separately
function objectCutCall(body: AnyObj, res: any){
    //First check if there are enough calls in month for this API available to
    //make calls then update with a separate function or params in the
    checkDBAvailability(1)
    .then((val) => {
        console.log(`[database]: OC Calls available`);
        console.log(val);
        makeCall();
    })
    .catch(e => handleError(`[database]: ${e}`, res));

    function makeCall() {

        let match = body.image_data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let encodedParams = new URLSearchParams();
        encodedParams.append("image_base64", match[2]);
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
            console.log(response);
            if(response.data.response.image_base64){
                docDBUpdate(1, res);
                let convertedObj = { "converted": (`${getPrefix(body.image_data)}` + `${response.data.response.image_base64}`), };
                res.send(convertedObj);
                console.log(convertedObj);
            } else {
                handleError("Error from ObjectCut API in response data", res);
                return;
            }
        })
        .catch((error: any) => {
            //send error to frontend
            docDBUpdate(1, res);
            handleError(error, res);
            return; 
        });
    }
}

function a4aBGRCall(prefix:string, filename:string, fgMode: string, res:any){
    checkDBAvailability(2)
    .then((val) => {
        console.log(`[database]: A4A Calls available`);
        console.log(val);
        makeCall();
    })
    .catch( e => handleError(`[database]: ${e}`, res));

    function makeCall(){
        let file = fs.readFileSync(filename);
        
        let data = new FormData();
        data.append("image", file);

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
            //delete file permanently
            //increment tracker in DB
            docDBUpdate(2, res);
            try{
                fs.unlinkSync(filename);
                console.info(`[FS] File removed: ${filename}`);
            } catch (e){
                handleError(e, res);
            }
            let convertedObj = { converted: `${prefix}${response.data.results[0].entities[0].image}` };
            res.send(convertedObj);
        })
        .catch((error: any) => {
            //delete file permanently
            docDBUpdate(2, res);
            try{
                fs.unlinkSync(filename);
                console.info(`[FS] File removed: ${filename}`);
            } catch (e){
                handleError(`[FS]: ${e}`, res);
            }
             handleError("Error occured in a4aBGR API call \n" + error, res);
        });
    }

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
        let a4aObj = base64ToFile(body.image_data, res);
        
        if(a4aObj !== 'Invalid String'
          && typeof(a4aObj) === 'object'
          && a4aObj.fName 
          && a4aObj.pFix)
        {
            a4aBGRCall(a4aObj.pFix, a4aObj.fName, body.options.fg_options, res);
        } else {
             handleError("Error occured in file conversion", res)
             .catch(e => console.error(`[server]: ${e}`));
        }
        
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
        fs.writeFileSync(`${rand_str}.jpg`, resp.data);
        tempFname += `/${rand_str}.jpg`;
    }
    if(resp.type === 'image/png'){
        fs.writeFileSync(`${rand_str}.png`, resp.data);
        tempFname += `/${rand_str}.png`;
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
