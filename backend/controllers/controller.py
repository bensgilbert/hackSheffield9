# Basic controller set up - will send information between database and front end

from flask import Flask, render_template

# Creates flask object
app = Flask(__name__)

@app.route("/")
def index():
    return "Hello"


