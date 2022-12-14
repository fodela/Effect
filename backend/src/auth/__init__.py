# import validators
import json
from typing import Dict, List
from flask import Blueprint, request,  jsonify, abort
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.exceptions import HTTPException
from flask_jwt_extended import (jwt_required,
                                create_access_token,
                                create_refresh_token,
                                get_jwt_identity
                                )

from ..database.models import User
auth = Blueprint("auth", __name__, url_prefix="/api/v1/auth")


@auth.post("/register")
def register():
    # def username email and password from request
    username: str = request.json["username"]
    email: str = request.json["email"]
    password: str = request.json["password"]

    # check if password is < 8 xters
    if len(password) < 8:
        abort(400, "password is too short. Password must be at least 8 characters")

    # username must be greater than 3 xters
    if len(username) <= 3:
        abort(400, "username is too short. username must be 3 characters or more")

    # username must be alphanumeric
    if not username.isalnum() or " " in username:
        abort(400, "username must contain alphabet and numbers only and must not contain spaces")

    # [] check email validity
    # # check if username already exist
    # # validate email
    # # if not validator.email(email):
    # #     abort(400)
    # if User.query.filter_by(username=username).first() is not None:
    #     abort(409, "username already exist. Chose a different username")

    # # check if email already exist
    # if User.query.filter_by(email=email).first() is not None:
    #     abort(409, "email already exist.")

    # hash the password
    pwd_hash = generate_password_hash(password)

    try:
        user = User(username=username, password=pwd_hash, email=email)

        user.insert()

        return jsonify({
            "success": True,
            "code": 200,
            "message": "User created",
            "user": {
                "username": username,
                "email": email
            }
        })
    except Exception as e:
        abort(500)


# [x]: login
@auth.post("/login")
def login():
    email: str = request.json.get("email", "")
    password: str = request.json.get("password", "")

    try:
        user = User.query.filter_by(email=email).first()
        
        if user:
            # Password validation
            is_pwd_correct = check_password_hash(user.password, password)

            if is_pwd_correct:
                refresh_token = create_refresh_token(identity=user.id)

                access_token = create_access_token(identity=user.id)

                return jsonify(
                    {
                        "success": True,
                        "code": 200,
                        "refresh_token": refresh_token,
                        "access_token": access_token,
                        "username": user.username,
                        "email": user.email,
                    }
                )
        

    except HTTPException as err:
        abort(err.code)
        return err


    abort(401, "invalid email or password")


@auth.get("/me")
@jwt_required()
def me():
    user_id = get_jwt_identity()

    user_query = User.query.get(user_id)
    user: List = user_query.format()

    if user:
        return jsonify({
            "success": True,
            "user": user
        }
        ), 200
    else:
        abort(400)


@auth.get("/refresh")
@jwt_required(refresh=True)
def refresh_user_token():
    # get user_id
    user_id: int = get_jwt_identity()

    # create access token
    access_token = create_access_token(identity=user_id)

    return jsonify({
        "success": True,
        "code": 200,
        "access_token": access_token
    })
