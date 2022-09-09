from typing import Dict
from flask import Flask, jsonify

app = Flask("src")


def bad_request(error):
    return (
        jsonify(
            {
                "success": False,
                "error": 400,
                "message": f"bad request: {error.description}"}),
        400,
    )


def unauthorized(error):
    return (
        jsonify(
            {
                "success": False,
                "error": 401,
                "message": f"unauthorized: {error.description}"}),
        401,
    )


def forbidden(error):
    return (
        jsonify(
            {
                "success": False,
                "error": 403,
                "message": f"forbidden: {error.description}"}),
        403,
    )


def not_found(error):
    return (
        jsonify(
            {
                "success": False,
                "error": 404,
                "message": f"not found: {error.description}"}),
        404,
    )


@app.errorhandler(409)
def conflict(error) -> tuple:
    return jsonify(
        {
            "success": False,
            "error": 409,
            "message": f"conflict: {error.description}"
        }
    ), 409


def unprocessable(error):
    return (
        jsonify(
            {
                "success": False,
                "error": 422,
                "message": f"unprocessable : {error.description}",
            }
        ),
        422,
    )


@app.errorhandler(500)
def server_error(error) -> tuple:
    return (
        jsonify(
            {
                "success": False,
                "error": 500,
                "message": f"server error : {error.description}",
            }
        ),
        500,
    )
