import json
from os import environ as env
from urllib.parse import quote_plus, urlencode

from sqlalchemy.orm import Session
from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, session, url_for, jsonify

from models import Order, engine, Account

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

app = Flask(__name__)
app.secret_key = env.get("APP_SECRET_KEY")

oauth = OAuth(app)

oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration'
)

@app.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )

@app.route("/callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    session["user"] = token
    return redirect("/")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(
        "https://" + env.get("AUTH0_DOMAIN")
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": url_for("home", _external=True),
                "client_id": env.get("AUTH0_CLIENT_ID"),
            },
            quote_via=quote_plus,
        )
    )


# Checks if user in session - meaning logged in
def isAuthorised():
    if 'user' in session:
        return True
    else:
        return False


# Change home.html to the home template we want and change the Auth0 links from localhost to what we actually want
@app.route("/")
def home():
    return render_template("test.html", session=session.get('user'), pretty=json.dumps(session.get('user'), indent=4))

@app.route("/user")
def userProfile():
    if isAuthorised():
        # Get userEmail from the session to fetch user data from database
        userEmail = session.get('user').get('userinfo').get('user')
        return "get database data"
    else:
        return redirect(url_for("login"))

# Takes all orders from order table and stores in list
# Outputted as JSON
@app.route("/requests")
def requests():
    if isAuthorised():
        user_email = session.get('user').get('userinfo').get('user').get('email')
        with Session(engine) as db_session:
            user_id = db_session.query(Account).filter(Account.email == user_email).first().id
            # Query to find orders which are not being fulfilled
            unfulfilled_orders = db_session.query(Order).filter(Order.fulfilled.is_(None),
                                                                Order.fulfilled.is_(""))
            # Query to find orders which are being fulfilled by the user logged in
            my_orders = db_session.query(Order).filter(Order.fulfilled.is_(user_id))

            # Check if orders are retrieved
            if not unfulfilled_orders:
                unfulfilled_orders_list = "No unfulfilled orders :)"
            else:
                # Prepare the list of orders
                unfulfilled_orders_list = [
                    {
                        "id": order.id,
                        "message": order.message,
                        "account_id": order.account_id,
                        "lat": order.lat,
                        "lng": order.lng,
                        "fulfilled": order.fulfilled,
                    }
                    for order in unfulfilled_orders
                ]

            if not my_orders:
                my_orders_list = "You have not chosen any orders to fulfil :("
            else:
                my_orders_list = [
                    {
                        "id": order.id,
                        "message": order.message,
                        "account_id": order.account_id,
                        "lat": order.lat,
                        "lng": order.lng,
                        "fulfilled": order.fulfilled,
                    }
                    for order in my_orders

                ]

            combination = [my_orders_list, unfulfilled_orders_list]


            return json.dumps(combination, sort_keys=False)
    else:
        return redirect(url_for("login"))


@app.route("/create-request")
def createRequest():
    if isAuthorised():
        #add a new request to db
        return "success message"
    else:
        return redirect(url_for("login"))

@app.route("/fulfil-request")
def fulfilRequest():
    if isAuthorised():
        # mark request fulfilled
        return "success message"
    else:
        return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=env.get("PORT", 3000))
