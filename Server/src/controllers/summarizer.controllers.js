import { Summary } from "../../text_summarizer/summarizer.HF.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { summarizeSchema } from "../models/summarizer.model.js";
import { ApiResponse } from "../utils/ApiRes.js";
import { ApiError } from "../utils/ApiError.js";

const  textSummarizer = asyncHandler(async (req, res) => {
    if(req.user){
        const { inputText } = req.body;
        const generatedText = await Summary(inputText);
        // console.log(sumSchema.generatedText);
        return res.status(201).json(
            new ApiResponse(200, {
                generatedText: generatedText
            },"Summary Generated successfully")
        )
    }
    else{
        res.status(401).json(
            new ApiResponse(401, "Unauthorized Access")
        )
    }
})

const saveSummarizer = asyncHandler(async(req, res) => {
    const { inputText, generatedText } = req.body;
    if(!(inputText && generatedText)){
        return res.status(401).json(
            new ApiError(401, "Couldn't Save Empty")
        )
    }
    const instance = await summarizeSchema.create({
        createdBy: req.user,
        inputText,
        generatedText
    })
    if(!instance){
        res.status(500).json(
            new ApiError(401, "Server Error")
        )
    }
    return res.status(201).json(
        new ApiResponse(201, instance, "Text Saved")
    )

})

export{
    textSummarizer,
    saveSummarizer
}