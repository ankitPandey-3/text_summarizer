import { Summary } from "../../text_summarizer/summarizer.HF.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { summarizeSchema } from "../models/summarizer.model.js";
import { ApiResponse } from "../utils/ApiRes.js";
import { ApiError } from "../utils/ApiError.js";


function truncateParagraph(paragraph) {
    // Split the paragraph into words
    const words = paragraph.trim().split(/\s+/);
    
    // Extract the first three words
    const firstThreeWords = words.slice(0, 3);
    
    // Join the first three words and append "..."
    const truncatedParagraph = firstThreeWords.join(" ") + "...";
    
    return truncatedParagraph;
}

const  textSummarizer = asyncHandler(async (req, res) => {
    if(req.user){
        const { inputText } = req.body;
        const generatedText = await Summary(inputText);
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
    const title = truncateParagraph(generatedText);
    const instance = await summarizeSchema.create({
        createdBy: req.user._id,
        inputText,
        generatedText,
        title
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

const getSaved = asyncHandler(async(req, res) => {
    const id = req.user?._id;
    const allSaved = await summarizeSchema.find({createdBy: id});
    return res.status(200).json(
        new ApiResponse(200, allSaved, "Successfully fetched")
    )
})

const getSavedByTitle = asyncHandler(async(req, res) => {
    const title = req.params.title;
    const saved = await summarizeSchema.findOne({createdBy: req.user._id, title: title});
    if(!saved){
        return res.status(200).json(
            new ApiResponse(200, {}, "No such content")
        )
    }
    return res.status(200).json(
        new ApiResponse(200, saved, "Successfully fetched")
    )
})

export{
    textSummarizer,
    saveSummarizer,
    getSaved,
    getSavedByTitle
}
