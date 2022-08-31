from flask import Flask, jsonify

from .database.models import setup_db
from flask_cors import CORS

# app = Flask(__name__)
"""
create_app()
    create and configure the app
"""


def create_app(test_config=None):

    app = Flask(__name__)
    setup_db(app)

    CORS(app, resources={r"api/*": {"origin": "*"}})

    @app.after_request
    def after_request(response):
        response.headers.add(
            "Access-Control-Allow-Headers", "Content-Type, Authorization"

        )
        response.headers.add(
            "Access-Control-Headers", "GET, POST, PATCH, DELETE, OPTIONS"
        )

        return response

    @app.route("/")
    def hello_effect():
        return jsonify({"message": "hello effect!"})

    @app.route("/about")
    def about_effect():
        return jsonify({"about": "Effect is a productivity app that combines the pomodoro technique and the "})

    return app
