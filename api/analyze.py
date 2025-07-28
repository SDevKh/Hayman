import os
import json

def handler(request):
    try:
        # Check if API key exists
        api_key = os.environ.get("GOOGLE_API_KEY")
        if not api_key:
            return {
                "statusCode": 200,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"error": "API key not configured in Vercel environment variables"})
            }
        
        # Import here to avoid import errors if package not available
        import google.generativeai as genai
        
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Parse request body
        if hasattr(request, 'get_json'):
            data = request.get_json()
        else:
            body = request.get('body', '{}')
            data = json.loads(body) if body else {}
        
        if not data:
            return {
                "statusCode": 400,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"error": "No data provided"})
            }
        
        # Generate simple response
        result = {
            "businessName": data.get('businessName', 'Your Business'),
            "swot": {
                "strengths": ["Strong market position", "Experienced team"],
                "weaknesses": ["Limited resources", "Market competition"],
                "opportunities": ["Digital expansion", "New markets"],
                "threats": ["Economic changes", "Competition"]
            },
            "growthPlan": [
                "Step 1: Optimize current operations",
                "Step 2: Expand marketing reach", 
                "Step 3: Develop new products"
            ]
        }
        
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            "body": json.dumps(result)
        }
        
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": f"Server error: {str(e)}"})
        }