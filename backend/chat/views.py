import os
import logging
import httpx
from dotenv import load_dotenv
from rest_framework.views import APIView
from rest_framework.response import Response

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)

class ChatAPIView(APIView):
    def post(self, request):
        user_message = request.data.get("message", "")
        if not user_message:
            return Response({"error": "No message provided"}, status=400)

        logger.info(f"User message: {user_message}")

        headers = {
            "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
            "HTTP-Referer": "http://localhost",  # optional
            "X-Title": "ReactChatWithOpenRouter"
        }

        json_data = {
            "model": "deepseek/deepseek-r1-distill-llama-70b:free",
            "messages": [
                # {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Respond briefly in a friendly tone: {user_message}"},
                {"role": "user", "content": user_message}
            ]
        }

        try:
            response = httpx.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=json_data)
            response.raise_for_status()
            reply = response.json()["choices"][0]["message"]["content"]
            return Response({"reply": reply.strip()})
        except httpx.HTTPStatusError as e:
            logger.error(f"❌ HTTP error: {str(e)}")
            return Response({"error": "OpenRouter API Error", "details": str(e)}, status=500)
        except Exception as e:
            logger.error(f"❌ General error: {str(e)}")
            return Response({"error": "Internal Server Error", "details": str(e)}, status=500)