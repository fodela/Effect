from flask import Flask, jsonify


app = Flask(__name__)


@app.route("/")
def hello_effect():
    return jsonify({"message": "hello effect!"})
