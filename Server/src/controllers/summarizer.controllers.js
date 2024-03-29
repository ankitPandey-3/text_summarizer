import { Summary } from "../../text_summarizer/summarizer.HF.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { summarizeSchema } from "../models/summarizer.model.js";
import { ApiResponse } from "../utils/ApiRes.js";

const  textSummarizer = asyncHandler(async (req, res) => {
    const { inputText } = req.body;
    const generatedText = await Summary(inputText);
    const sumSchema = await summarizeSchema.create({
        inputText,
        generatedText,
    });
    // console.log(sumSchema.generatedText);
    return res.status(201).json(
        new ApiResponse(200, sumSchema)
    )
})

export{
    textSummarizer
}