const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//CallTrackerSchema
export const CallTrackerSchema = new Schema({
    name: String,
    calls_month: Number,
    calls_total: Number,
    last_call_date: Date,
    reset_date: Date,
}); 
