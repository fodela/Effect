from flask import Flask, jsonify

app = Flask("src")


@app.errorhandler(400)
def conflict(error):
    return (
        jsonify(
            {
                "success": False,
                "error": 400,
                "message": f"conflict: {error.description}"
            }
        ), 400
    )


@app.errorhandler(404)
def not_found(error):
    return (
        jsonify(
            {
                "success": False,
                "error": 404,
                "message": f"resource not found: {error.description}"}),
        404,
    )


@app.errorhandler(422)
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


@app.errorhandler(409)
def conflict(error) -> Dict:
    return jsonify(
        {
            "success": False,
            "error": 409,
            "message": f"conflict: {error.description}"
        }
    ), 409


@app.errorhandler(500)
def server_error(error) -> Dict:
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
