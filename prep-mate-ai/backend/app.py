from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import whisper
import os
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

# 🧠 Download sentiment model (only first time)
nltk.download("vader_lexicon")
sia = SentimentIntensityAnalyzer()

app = FastAPI()

# 🔓 Allow frontend to connect (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🎙️ Load Whisper model (can be "base", "small", etc.)
model = whisper.load_model("base")

@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        file_path = "temp.wav"

        # Save file locally
        with open(file_path, "wb") as f:
            f.write(contents)

        # 🔊 Transcribe using Whisper
        result = model.transcribe(file_path)
        os.remove(file_path)

        text = result.get("text", "")

        # 🧠 Sentiment detection
        sentiment_score = sia.polarity_scores(text)
        compound = sentiment_score["compound"]

        if compound > 0.05:
            sentiment_label = "Positive"
        elif compound < -0.05:
            sentiment_label = "Negative"
        else:
            sentiment_label = "Neutral"

        return {
            "text": text,
            "sentiment": {
                "score": sentiment_score,
                "label": sentiment_label
            }
        }

    except Exception as e:
        return {"error": str(e)}