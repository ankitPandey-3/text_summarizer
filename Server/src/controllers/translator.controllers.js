import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiRes.js";
import axios from "axios";
import { textClassification } from "@huggingface/inference";


const textTranslate = asyncHandler(async (req, res) => {
    if (req.user) {
        const { text } = req.body;
        const url = 'http://localhost:4000/translate';
        const data = {
            text: text
        };

        axios.post(url, data)
            .then(response => {
                console.log('Data:', response.data);
                return res.status(201).json(
                    new ApiResponse(200, {
                        generatedText: response.data
                    }, "Text Translated successfully")
                )
            })
            .catch(error => {
                console.error('Error:', error);
                return res.status(501).json(
                    new ApiResponse(500, {
                    }, "Internal Server Error")
                )
            });
    }
    else {
        res.status(401).json(
            new ApiResponse(401, "Unauthorized Access")
        )
    }
})

export {
    textTranslate
}
