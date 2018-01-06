"""
Main application server for a password protected web app.
This is vulnerable to a timing side channel attack.
"""
import time
from itertools import zip_longest
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)
app.config.from_object("config")


def secure_compare(password, attempt):
    """
    Compares strings for equality, sleeping 200 milliseconds per character to
    discourage brute forcing while maintaining usability.
    """
    for chars in zip_longest(password, attempt):
        if chars[0] != chars[1]:
            return False
        time.sleep(0.2)
    return True


def get_data(key):
    """
    Gets request data by key, trying json first, and then form data if
    that fails
    """
    json = request.get_json(force=True, silent=True)
    if json is not None:
        data = json.get(key)
    else:
        data = request.form.get(key)
    return data


@app.route("/login", methods=["POST"])
def login():
    """
    API endpoint for logging in based on the POSTed password, sends
    back a boolean indicating success or failure
    """
    attempt = get_data("password") or ""
    return jsonify(secure_compare(app.config["PASSWORD"], attempt))


@app.route("/")
def index():
    """
    Renders the main web page that prompts for login
    """
    return render_template("index.html")
