# Basic controller set up - will send information between database and front end
from flask import Flask, request, jsonify

# Creates flask object
app = Flask(__name__)

# Route following /
# Returns needed information for the given page
@app.route("/")
def index():
    return "Hello"

@app.route("/login")
def login():
    return "login"

@app.route("/users/<int:user_id>")
def users_api(user_id):
    # user_id is passed directly as a parameter
    return jsonify({"message": f"User ID is {user_id}"})
