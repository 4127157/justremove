import { CallTrackerSchema }  from "../schemas/CallTrackerSchema";

const mongoose = require("mongoose");

export const OCCallModel = mongoose.model("OC_Call", CallTrackerSchema);
