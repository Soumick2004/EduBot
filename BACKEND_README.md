# ScholarIQ Backend Setup

This document explains how to set up and run the Python Flask backend for ScholarIQ.

## Prerequisites

- Python 3.7 or higher
- OpenAI API key

## Quick Setup

1. **Install dependencies:**
   ```bash
   python setup_backend.py
   ```

2. **Add your OpenAI API key:**
   - Open the `.env` file
   - Replace `your_openai_api_key_here` with your actual OpenAI API key

3. **Run the backend:**
   ```bash
   python backend.py
   ```

The backend will start on `http://localhost:5000`

## Manual Setup

If you prefer to set up manually:

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Create .env file:**
   ```bash
   echo "OPENAI_API_KEY=your_actual_api_key_here" > .env
   ```

3. **Run the backend:**
   ```bash
   python backend.py
   ```

## API Endpoints

- `POST /summarize/text` - Summarize text content
- `POST /summarize/pdf` - Summarize PDF files
- `POST /summarize/youtube` - Summarize YouTube videos

## Frontend Integration

The React frontend (running on port 3000) will automatically connect to the backend. Make sure both are running:

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

## Troubleshooting

- **CORS errors**: Make sure the backend is running on port 5000
- **API key errors**: Verify your OpenAI API key in the .env file
- **Import errors**: Run `pip install -r requirements.txt` to install all dependencies
