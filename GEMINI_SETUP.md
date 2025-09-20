# Google Gemini API Setup Guide

## How to Get Your Free Gemini API Key

1. **Visit Google AI Studio**: Go to https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Create API Key**: Click "Create API Key" button
4. **Copy the Key**: Copy the generated API key (starts with "AIza...")

## How to Configure the Backend

1. **Open** `backend.py` file
2. **Find** this line:
   ```python
   genai.configure(api_key="YOUR_GEMINI_API_KEY_HERE")
   ```
3. **Replace** `YOUR_GEMINI_API_KEY_HERE` with your actual API key
4. **Save** the file
5. **Restart** the backend

## Example:
```python
genai.configure(api_key="AIzaSyBvQZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8Q")
```

## Benefits of Gemini:
- ✅ **Free tier available** (unlike OpenAI)
- ✅ **No quota issues** for basic usage
- ✅ **Fast responses**
- ✅ **Good for text summarization**

## Testing:
Once configured, the chatbot will work without any "encountered an error" messages!
