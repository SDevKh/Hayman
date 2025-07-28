# app.py
# To run this:
# 1. Make sure you have Python installed.
# 2. In your terminal, install the required libraries: 
#    pip install Flask Flask-Cors requests google-generativeai python-dotenv
# 3. Create a new file named .env in the same directory as this app.py file.
# 4. In the .env file, add your API key like this:
#    GOOGLE_API_KEY="YOUR_API_KEY_HERE"
# 5. Run the server: python app.py

import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# Initialize the Flask application
app = Flask(__name__)
CORS(app)

# --- AI Model Configuration ---
api_key = os.getenv("GOOGLE_API_KEY")
model = None

if api_key:
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        print("--- Google AI Model configured successfully with 'gemini-1.5-flash'. ---")
    except Exception as e:
        print(f"!!! CONFIGURATION ERROR !!!\n{e}")
else:
    print("!!! CRITICAL ERROR: GOOGLE_API_KEY not found. Please check your .env file. !!!")

# --- NEW: Function to Validate User Input ---
def is_input_meaningful(business_description):
    """
    Uses the AI to perform a quick check on the quality of the user's input.
    """
    if not model:
        # If the model isn't configured, we can't validate.
        # It's safer to assume the input is okay than to block a valid user.
        return True
        
    # First, a simple length check to filter out obvious gibberish.
    if len(business_description) < 15:
        return False

    # Second, ask the AI to classify the input with more forgiving instructions.
    try:
        validation_prompt = f"""
        Your task is to determine if the following text is a real attempt to describe a business, or if it is complete nonsense. Ignore minor spelling or grammar errors. The description might be simple or vague, but as long as it's not random gibberish (like "asdf ghjkl"), you should approve it.
        Answer with a single word: YES or NO.

        Description: "{business_description}"
        """
        response = model.generate_content(validation_prompt)
        decision = response.text.strip().upper()
        print(f"--- Input Validation Check ---")
        print(f"Description: '{business_description}'")
        print(f"AI Decision: {decision}")
        print(f"----------------------------")
        return "YES" in decision
    except Exception as e:
        print(f"An error occurred during input validation: {e}")
        # If validation fails, allow the request to proceed to avoid blocking users.
        return True


def generate_analysis_with_ai(business_data):
    """
    Generates a business analysis using a generative AI model.
    """
    if not model:
        return {
            "businessName": business_data.get("businessName", "Your Business"),
            "swot": {
                "strengths": ["Error: AI model not configured."],
                "weaknesses": ["Please check the backend server logs."],
                "opportunities": ["The GOOGLE_API_KEY might be missing or invalid."],
                "threats": ["Analysis could not be generated."]
            },
            "growthPlan": ["Step 1: Resolve the AI configuration issue on the server."]
        }

    prompt = f"""
    Analyze the following business and generate a SWOT analysis and a 3-step initial growth plan.

    Business Data:
    - Name: {business_data.get('businessName')}
    - Industry: {business_data.get('industry')}
    - Description: {business_data.get('businessDescription')}
    - Age: {business_data.get('businessAge')}
    - Team Size: {business_data.get('teamSize')}

    Your task is to act as an expert business consultant. Based on the data provided, generate:
    1. A SWOT analysis with 2-3 points for each category (Strengths, Weaknesses, Opportunities, Threats).
    2. A simple, actionable 3-step growth plan suitable for a business of this type and age.

    IMPORTANT: Respond with ONLY a valid JSON object in the following format. Do not include any text or markdown formatting before or after the JSON object.

    {{
      "businessName": "{business_data.get('businessName')}",
      "swot": {{
        "strengths": ["Strength 1", "Strength 2"],
        "weaknesses": ["Weakness 1", "Weakness 2"],
        "opportunities": ["Opportunity 1", "Opportunity 2"],
        "threats": ["Threat 1", "Threat 2"]
      }},
      "growthPlan": [
        "Step 1: Detailed first action.",
        "Step 2: Detailed second action.",
        "Step 3: Detailed third action."
      ]
    }}
    """

    try:
        print("--- Sending prompt to AI model for full analysis ---")
        response = model.generate_content(prompt)
        response_text = response.text.strip().replace("```json", "").replace("```", "")
        print("--- Received response from AI ---")
        print(response_text)
        analysis_json = json.loads(response_text)
        return analysis_json
    except Exception as e:
        print(f"An error occurred during AI generation: {e}")
        return None


@app.route('/analyze', methods=['POST'])
def analyze_business():
    """
    Receives business data, validates it, sends it to the AI for analysis,
    and returns the result.
    """
    business_data = request.get_json()
    if not business_data:
        return jsonify({"error": "No data provided"}), 400

    print("--- Received Business Data ---")
    print(business_data)

    # --- NEW: Validate the business description before proceeding ---
    description = business_data.get("businessDescription", "")
    if not is_input_meaningful(description):
        # Return a specific error message that the frontend can handle.
        return jsonify({
            "error": "Please provide a more detailed and meaningful business description."
        }), 400 # 400 indicates a "Bad Request" from the client.

    
    # --- Generate Analysis using AI ---
    ai_analysis = generate_analysis_with_ai(business_data)

    if ai_analysis:
        return jsonify(ai_analysis)
    else:
        return jsonify({"error": "Failed to generate AI analysis. Please try again later."}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
