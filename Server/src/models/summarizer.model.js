import mongoose from "mongoose";
import { User } from "./user.model";

const summarizedSchema = new mongoose.Schema({
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    inputText:{
        type: String,
        required: true,
        default: ''
    },
    generatedText:{
        type: String,
        required: true,
        default: ''
    }
},{timestamps: true});

export const summarizeSchema = mongoose.model('summarizeSchema', summarizedSchema); 