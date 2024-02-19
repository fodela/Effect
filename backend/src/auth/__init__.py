# import validators
from flask import Blueprint, request, jsonify, abort
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.exceptions import HTTPException  # type:ignore
from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,  # type:ignore
    create_access_token,  # type:ignore
    create_refresh_token,  # type:ignore
    unset_jwt_cookies,
)  # type:ignore
from ..database.models import User
from typing import Optional, Any

auth = Blueprint("auth", __name__, url_prefix="/api/v1/auth")


@auth.post("/register")
def register():
    # def username email and password from request

    username: Optional[str] = request.json.get("username", "")  # type:ignore
    email: Optional[str] = request.json.get("email", "")  # type:ignore
    password: Optional[str] = request.json.get("password", "")  # type:ignore
    image_link: Optional[str] = request.json.get("image_link", "")  # type:ignore

    if not email or not password:
        abort(400, "email and password are required")
    else:
        if len(password) < 8:
            abort(400, "password is too short. Password must be at least 8 characters")

        if username and len(username) <= 3:
            abort(400, "username is too short. username must be 4 characters or more")

        # username must be alphanumeric
        if username and (not username.isalnum() or " " in username):
            abort(
                400,
                "username must contain alphabet and numbers only and must not contain spaces",
            )
        # existing email or username
        existing_user = User.query.filter_by(email=email).first()  # type:ignore
        if existing_user:
            abort(409, "email already exist.")

        existing_user = User.query.filter_by(username=username).first()  # type:ignore
        if existing_user:
            abort(409, "This username is already taken")

        # if not validator.email(email):
        #     abort(400)

        try:
            pwd_hash: str = generate_password_hash(password)
            user = User(password=pwd_hash, email=email)

            if not username:
                user.username = email.split("@")[0]

            if image_link:
                user.image_link = image_link

            user.insert()

            return jsonify(
                {
                    "success": True,
                    "code": 200,
                    "message": "User created",
                    "user": {"username": username, "email": email},
                }
            )
        except Exception as e:
            print(e)
            abort(500)


# [x]: login
@auth.post("/login")
def login():
    email: str = request.json.get("email", "")  # type:ignore
    password: str = request.json.get("password", "")  # type:ignore

    if not email or not password:
        abort(400, "email and password are required")
    else:
        try:
            user: Any = User.query.filter_by(email=email).first()  # type:ignore

            if not user:
                abort(401, "invalid email or password")

            if check_password_hash(user.password, password):
                access_token, refresh_token = create_access_token(
                    identity=user.id
                ), create_refresh_token(identity=user.id)

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

            else:
                abort(401, "invalid email or password")
        except Exception as e:
            abort(500, "Server Error")


@auth.get("/me")
@jwt_required()
def me():
    user_id: int = get_jwt_identity()

    user_query: Any = User.query.get(user_id)  # type:ignore
    user = user_query.format()

    if not user:
        abort(400)

    return jsonify({"success": True, "user": user}), 200


@auth.get("/refresh")
@jwt_required(refresh=True)
def refresh_user_token():
    user_id: int = get_jwt_identity()
    access_token: str = create_access_token(identity=user_id)
    return jsonify({"success": True, "access_token": access_token, "code": 200})


@auth.get("/logout")
@jwt_required()
def logout():
    try:
        # user_id:int = get_jwt_identity()
        response = jsonify({"success": True, "message": "Logout successful"}, 200)
        unset_jwt_cookies(response, "logout")
        return response
    except Exception:
        abort(500)
