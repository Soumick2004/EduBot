from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai
from youtube_transcript_api import YouTubeTranscriptApi
import fitz  # PyMuPDF

# Configure Gemini API - You need to get your API key from https://makersuite.google.com/app/apikey
# For now, we'll use a placeholder that will show an error message
try:
    genai.configure(api_key="AIzaSyCySMKqsieIny98PlpkXKn4L32bawrHFzo")  # Replace with your actual Gemini API key
    model = genai.GenerativeModel('gemini-2.0-flash-exp')
    GEMINI_AVAILABLE = True
except:
    GEMINI_AVAILABLE = False

# Flask app setup
app = Flask(__name__)
CORS(app, origins="*")

# Function to get summary from Gemini
def get_summary(prompt):
    if not GEMINI_AVAILABLE:
        return "Gemini API is not configured. Please add your Gemini API key to the backend.py file. Get your free API key from: https://makersuite.google.com/app/apikey"
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        if "quota" in str(e).lower() or "rate" in str(e).lower():
            return "I'm sorry, but I've reached my API usage limit. Please check your Gemini account billing or try again later."
        else:
            return f"I encountered an error: {str(e)}. Please try again."

# ---------- ROUTES ---------- #

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({'status': 'Backend is running!', 'gemini_available': GEMINI_AVAILABLE})

@app.route('/summarize/text', methods=['POST'])
def summarize_text():
    try:
        data = request.get_json()
        text = data['text']
        prompt = f"Summarize the following text:\n{text}"
        summary = get_summary(prompt)
        return jsonify({'summary': summary})
    except Exception as e:
        return jsonify({'summary': f"Error processing request: {str(e)}"}), 500

@app.route('/summarize/pdf', methods=['POST'])
def summarize_pdf():
    try:
        file = request.files['file']
        doc = fitz.open(stream=file.read(), filetype='pdf')
        text = ""
        for page in doc:
            text += page.get_text()
        prompt = f"Summarize the following content:\n{text}"
        summary = get_summary(prompt)
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({'summary': f"Error processing PDF: {str(e)}"}), 500

@app.route('/summarize/youtube', methods=['POST'])
def summarize_youtube():
    try:
        data = request.get_json()
        url = data['url']
        video_id = url.split("v=")[-1]  # Fixed parsing
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text = " ".join(t['text'] for t in transcript)
        prompt = f"Summarize the following content:\n{text}"
        summary = get_summary(prompt)
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({'summary': f"Error processing YouTube video: {str(e)}"}), 500

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)
