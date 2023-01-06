import os
from flask import Flask, jsonify
from .database import models
from flask_cors import CORS

from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

# Blueprints imports
from .auth import auth
from .endpoints.tasks import task


from src import error_handlers

load_dotenv()


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

    models.setup_db(app)

    # models.db_drop_and_create_all()

    CORS(app, resources={r"*": {"origin": ["http://localhost:3000","http://localhost:3001"]}}, supports_credentials=True)

    @app.after_request
    def after_request(response):
        response.headers.add(
            "Access-Control-Allow-Headers", "Content-Type, Authorization"

        )
        response.headers.add(
            "Access-Control-Headers", "GET, POST, PATCH, DELETE, OPTIONS"
        )

        return response

    # enable easy jwt manipulation using flask_jwt_extended
    JWTManager(app)

    app.register_blueprint(auth)
    app.register_blueprint(task)
    app.register_error_handler(400, error_handlers.bad_request)
    app.register_error_handler(401, error_handlers.unauthorized)
    app.register_error_handler(403, error_handlers.forbidden)
    app.register_error_handler(404, error_handlers.not_found)
    app.register_error_handler(409, error_handlers.conflict)
    app.register_error_handler(422, error_handlers.unprocessable)
    app.register_error_handler(500, error_handlers.server_error)

    return app
