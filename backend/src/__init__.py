import os
from flask import Flask, jsonify
from .database.models import setup_db
from flask_cors import CORS

from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

# import Blueprints
from .auth import auth
from .endpoints.tasks import task


load_dotenv()

# from .error_handlers import *

# app = Flask(__name__)
"""
create_app()
    create and configure the app
"""


def create_app(test_config=None):
    app = Flask(__name__)

    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY=os.getenv("SECRET_KEY"),
            JWT_SECRET_KEY=os.getenv("JWT_SECRET_KEY")
        )

    else:
        app.config.from_mapping(test_config)

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

    # enable easy jwt manipulation
    JWTManager(app)

    app.register_blueprint(auth)
    app.register_blueprint(task)

    return app
