import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from cerebras.cloud.sdk import Cerebras

# Load environment variables from a .env file
load_dotenv()

app = Flask(__name__)
# Configure Cross-Origin Resource Sharing (CORS)
CORS(app, origins=["https://www.haymangroup.tech", "http://localhost:8080", "*"])

# --- Cerebras AI Client Configuration ---
cerebras_api_key = os.getenv("CEREBRAS_API_KEY")
client = None

if cerebras_api_key:
    try:
        # Initialize the Cerebras client with the API key
        client = Cerebras(api_key=cerebras_api_key)
        print("--- Cerebras AI Client configured successfully. ---")
    except Exception as e:
        print(f"!!! CEREBRAS CONFIGURATION ERROR !!!\n{e}")
else:
    print("!!! CRITICAL ERROR: CEREBRAS_API_KEY not found. Please check your .env file. !!!")


def generate_analysis_with_ai(business_data):
    """
    Generates a business analysis using the Cerebras AI model.
    """
    if not client:
        # Return an error if the Cerebras client is not initialized
        return {
            "error": "AI client not configured.",
            "message": "The CEREBRAS_API_KEY might be missing or invalid. Please check the backend server logs."
        }

    # System prompt to instruct the AI on its role and the desired output format
    system_prompt = f"""
    You are an expert business consultant. Your task is to analyze the provided business data and generate a SWOT analysis and a 3-step initial growth plan.

    IMPORTANT: Respond with ONLY a valid JSON object in the following format. Do not include any text, explanations, or markdown formatting before or after the JSON object.

    {{
      "businessName": "{business_data.get('businessName', 'N/A')}",
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

    # User prompt containing the specific business details for analysis
    user_prompt = f"""
    Please analyze the following business based on the data provided:

    - Name: {business_data.get('businessName')}
    - Industry: {business_data.get('industry')}
    - Description: {business_data.get('businessDescription')}
    - Age: {business_data.get('businessAge')}
    - Team Size: {business_data.get('teamSize')}
    """

    try:
        print("--- Sending prompt to Cerebras AI model for analysis ---")
        # Create a non-streaming chat completion request
        completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model="qwen-3-235b-a22b-instruct-2507", # Model specified in your original code
            stream=False, # We need the full JSON response at once
            max_completion_tokens=2000,
            temperature=0.7,
            top_p=0.8
        )

        # Extract the response text
        response_text = completion.choices[0].message.content
        
        print("--- Received response from Cerebras AI ---")
        print(response_text)

        # Clean up the response to ensure it's a valid JSON string
        cleaned_response_text = response_text.strip().replace("```json", "").replace("```", "")
        
        # Parse the JSON string into a Python dictionary
        analysis_json = json.loads(cleaned_response_text)
        return analysis_json

    except json.JSONDecodeError as e:
        print(f"!!! JSON DECODE ERROR: Failed to parse AI response. Error: {e}")
        print(f"Raw Response Text: {response_text}")
        return {"error": "Failed to parse the AI's response. The format was invalid."}
    except Exception as e:
        print(f"!!! An error occurred during Cerebras AI generation: {e}")
        return {"error": "An unexpected error occurred while generating the AI analysis."}


@app.route('/analyze', methods=['POST', 'OPTIONS'])
def analyze_business():
    """
    API endpoint to receive business data, send it to the Cerebras AI for analysis,
    and return the result.
    """
    # Handle CORS preflight request
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
        }
        return jsonify({}), 204, headers

    # Standard response headers
    response_headers = {'Access-Control-Allow-Origin': '*'}

    # Get data from the POST request
    business_data = request.get_json()
    if not business_data:
        return jsonify({"error": "No data provided"}), 400, response_headers

    print("\n--- Received Business Data for Analysis ---")
    print(json.dumps(business_data, indent=2))

    # Basic input validation
    description = business_data.get("businessDescription", "")
    if len(description) < 15:
        return jsonify({
            "error": "Please provide a more detailed business description (at least 15 characters)."
        }), 400, response_headers

    # --- Generate Analysis using Cerebras AI ---
    ai_analysis = generate_analysis_with_ai(business_data)

    if ai_analysis and "error" not in ai_analysis:
        return jsonify(ai_analysis), 200, response_headers
    elif ai_analysis and "error" in ai_analysis:
        # Pass the specific error from the generation function to the client
        return jsonify(ai_analysis), 500, response_headers
    else:
        # Fallback for unexpected null response
        return jsonify({"error": "Failed to generate AI analysis. Please try again later."}), 500, response_headers


if __name__ == '__main__':
    # Run the Flask app in debug mode on port 5000
    app.run(debug=True, port=5000)
