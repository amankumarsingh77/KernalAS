import os
from flask import Blueprint, jsonify, make_response, request
from models import APIKey
from paths import DB_DIRECTORY_OPEN_AI
from embedchain import App
from utils.preprocessing import TextPreprocessor

sources_bp = Blueprint("sources", __name__)
text_processor = TextPreprocessor()

# API route to add data sources
@sources_bp.route("/api/add_sources", methods=["POST"])
def add_sources():
    try:
        embedding_model = request.json.get("embedding_model")
        name = request.json.get("name")
        value = request.json.get("value")

        # Preprocess the text data
        processed_value = text_processor.preprocess_text(
            value,
            remove_urls=True,
            remove_html=True,
            remove_special_chars=True,
            keep_punctuation=True,
            remove_numbers=False,
            lowercase=True
        )

        if embedding_model == "open_ai":
            os.chdir(DB_DIRECTORY_OPEN_AI)
            api_key = APIKey.query.first().key
            os.environ["OPENAI_API_KEY"] = api_key
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
            chat_bot.add("text", processed_value)
        return make_response(jsonify(message="Sources added successfully"), 200)
    except Exception as e:
        return make_response(jsonify(message=f"Error adding sources: {str(e)}"), 400)