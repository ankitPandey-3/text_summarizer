from fastapi import FastAPI, Request
from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch

app = FastAPI()

model_path = './summarizer-model-finetuned'
tokenizer_path = './summarizer-tokenizer'
model = T5ForConditionalGeneration.from_pretrained(model_path)
tokenizer = T5Tokenizer.from_pretrained(tokenizer_path)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

@app.post("/predict")
async def predict(request: Request):
    data = await request.json()
    input_text = data['text']
    encoded = tokenizer.batch_encode_plus([input_text], max_length=150, pad_to_max_length=True,return_tensors='pt')
    with torch.no_grad():
        ids = encoded['input_ids'].to(device, dtype = torch.long)
        mask = encoded['attention_mask'].to(device, dtype = torch.long)

        generated_ids = model.generate(
            input_ids = ids,
            attention_mask = mask, 
            max_length=150, 
            num_beams=2,
            repetition_penalty=2.5, 
            length_penalty=1.0, 
            early_stopping=True
            )
        preds = [tokenizer.decode(g, skip_special_tokens=True, clean_up_tokenization_spaces=True) for g in generated_ids]
    return {"text": preds}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=4000)
