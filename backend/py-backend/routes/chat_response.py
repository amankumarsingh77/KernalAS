import os
from flask import Blueprint, jsonify, make_response, request
from models import APIKey
from paths import DB_DIRECTORY_OPEN_AI
from embedchain import App
from utils.preprocessing import TextPreprocessor

chat_response_bp = Blueprint("chat_response", __name__)
text_processor = TextPreprocessor()

# Chat Response for user query
@chat_response_bp.route("/api/get_answer", methods=["POST"])
def get_answer():
    try:
        data = request.get_json()
        query = data.get("query")
        embedding_model = data.get("embedding_model")
        app_type = data.get("app_type")

        # Preprocess and tokenize the query
        processed_query = text_processor.preprocess_text(
            query,
            remove_urls=True,
            remove_html=True,
            remove_special_chars=True,
            keep_punctuation=True,
            remove_numbers=False,
            lowercase=True,
            tokenize=False,
            remove_stopwords=True
        )

        # Join tokens back into a string for the chat model
        processed_query = " ".join(processed_query)

        if embedding_model == "open_ai":
            os.chdir(DB_DIRECTORY_OPEN_AI)
            api_key = APIKey.query.first().key
            os.environ["OPENAI_API_KEY"] = api_key
            if app_type == "app":
                chat_bot = App.from_config(
                    config={
                        "llm": {
                            "provider": "openai",
                            "config": {
                                "model": "gpt-3.5-turbo-1106",
                                "temperature": 0.1,
                                "max_tokens": 1000,
                                "top_p": 1,
                                "stream": True,
                                "api_key": api_key,
                            },
                        },
                    }
                )

        response = chat_bot.chat(processed_query)
        return make_response(jsonify({"response": response}), 200)

    except Exception as e:
        return make_response(jsonify({"error": str(e)}), 400)