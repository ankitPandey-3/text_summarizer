export const DB_NAME = "text_summarizer";

export const generationOptions = {
    maxTokens: 400,
    temperature: 0.7, // Adjust temperature for controlling creativity
    topP: 0.9, // Adjust top-P sampling for controlling diversity
    beamSearch: false, // Disable beam search for more diverse outputs
};