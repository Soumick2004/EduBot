#!/usr/bin/env python3
"""
Setup script for ScholarIQ Backend
This script helps set up the Python backend environment
"""

import subprocess
import sys
import os

def install_requirements():
    """Install required Python packages"""
    try:
        print("Installing Python dependencies...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Dependencies installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing dependencies: {e}")
        return False
    return True

def create_env_file():
    """Create .env file if it doesn't exist"""
    if not os.path.exists('.env'):
        with open('.env', 'w') as f:
            f.write("OPENAI_API_KEY=your_openai_api_key_here\n")
        print("✅ Created .env file. Please add your OpenAI API key.")
    else:
        print("✅ .env file already exists.")

def main():
    print("🚀 Setting up ScholarIQ Backend...")
    print("=" * 50)
    
    # Install requirements
    if not install_requirements():
        print("❌ Setup failed. Please check the error messages above.")
        return
    
    # Create .env file
    create_env_file()
    
    print("\n" + "=" * 50)
    print("✅ Backend setup complete!")
    print("\nNext steps:")
    print("1. Add your OpenAI API key to the .env file")
    print("2. Run: python backend.py")
    print("3. The backend will be available at http://localhost:5000")
    print("\nNote: Make sure to run the React frontend on port 3000 for CORS to work properly.")

if __name__ == "__main__":
    main()
