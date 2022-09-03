# import validators
import json
from flask import Blueprint, request,  jsonify, abort
from werkzeug.security import check_password_hash, generate_password_hash

from ..database.models import User
auth = Blueprint("auth", __name__, url_prefix="/api/v1/auth")


@auth.post("/register")
def register():
    # def username email and password from request
    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"]

    # check if password is > 8 xters
    if len(password) < 8:
        return jsonify({
            "message": "error",
            "status_code": 400,
            "message": "password is too short"
        }, 400)

    # username must be greater than 3 xters
    if len(username) < 3:
        abort(404)
    # username must be alphanumeric
    if not username.isalnum() or " " in username:
        abort(404)

    # check if username already exist
    # validate email
    # if not validator.email(email):
    #     abort(404)
    # if User.query.filter_by(username=username).first() is not None:
        abort(400)

    # check if email already exist
    if User.query.filter_by(email=email).first() is not None:
        abort(4000)

    # hash the password
    pwd_hash = generate_password_hash(password)

    user = User(username=username, password=pwd_hash, email=email)

    user.insert()

    return jsonify({
        "message": "User created",
        "user": {
            "username": username, "email": email
        }
    })


@auth.get("/me")
def me():
    return {"user": "me"}
