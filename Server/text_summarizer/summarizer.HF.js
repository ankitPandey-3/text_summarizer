import { HfInference } from '@huggingface/inference';
import { generationOptions } from '../src/constants.js';

const Summary = async (inputs) => {
    const inference = new HfInference('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');
    try {    
        const response = await inference.summarization({
            model: "sshleifer/distilbart-cnn-12-6",
            inputs, // Correct parameter name
            ...generationOptions
        });
        return response.summary_text; // Use return to return the result
    } catch (error) {
        console.log('Error : ', error);
    }
}

export{
    Summary
}