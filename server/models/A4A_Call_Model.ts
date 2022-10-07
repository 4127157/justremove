
import { CallTrackerSchema } from "../schemas/CallTrackerSchema";

const mongoose = require("mongoose");

export const A4ACallModel = mongoose.model("A4A_Call", CallTrackerSchema);
