import os
import json
import google.generativeai as genai
from flask import Flask, request, jsonify

app = Flask(__name__)

def handler(req):
    # Configure AI
    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        return {"error": "API key not configured"}, 500
    
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    # Get request data
    data = req.get_json()
    if not data:
        return {"error": "No data provided"}, 400
    
    # Generate analysis
    prompt = f"""
    Analyze this business and return ONLY valid JSON:
    
    Business: {data.get('businessName')}
    Industry: {data.get('industry')}
    Description: {data.get('businessDescription')}
    
    {{
      "businessName": "{data.get('businessName')}",
      "swot": {{
        "strengths": ["Strong market position", "Experienced team"],
        "weaknesses": ["Limited resources", "Market competition"],
        "opportunities": ["Digital expansion", "New markets"],
        "threats": ["Economic changes", "Competition"]
      }},
      "growthPlan": [
        "Step 1: Optimize current operations",
        "Step 2: Expand marketing reach", 
        "Step 3: Develop new products"
      ]
    }}
    """
    
    try:
        response = model.generate_content(prompt)
        result = json.loads(response.text.strip().replace("```json", "").replace("```", ""))
        return result
    except:
        return {"error": "Failed to generate analysis"}, 500

# For Vercel
def main(req):
    return handler(req)

# For local testing
@app.route('/analyze', methods=['POST'])
def analyze():
    return jsonify(handler(request))

if __name__ == '__main__':
    app.run(debug=True, port=5000)