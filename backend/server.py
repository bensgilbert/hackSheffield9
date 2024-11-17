import json
from os import environ as env
from urllib.parse import quote_plus, urlencode

from sqlalchemy.orm import Session
from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv

from flask import Flask, redirect, render_template, session, request, url_for, jsonify, Response


from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session, sessionmaker
from sqlalchemy import create_engine, null, select, update
from models import Order, OrderItem, Account, engine
from sqlalchemy.ext.declarative import declarative_base

from flask_cors import CORS, cross_origin

from datetime import datetime

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

app = Flask(__name__)
app.secret_key = env.get("APP_SECRET_KEY")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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
@cross_origin()
def login():
    # return oauth.auth0.authorize_redirect(
    #     redirect_uri=url_for("callback", _external=True)
    # )
    return oauth.auth0.authorize_redirect(redirect_uri='http://localhost:5173/callback')

@app.route("/callback", methods=["GET", "POST"])
@cross_origin()
def callback():
    token = oauth.auth0.authorize_access_token()
    session["user"] = token
    return redirect('http://localhost:5173/')

@app.route("/logout")
@cross_origin()
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
        
        #Finds the user that is currently logged in in the database
        with Session(engine) as db_session:
            pass
        userEmail = session.get('user').get('userinfo').get('email')
        user = db_session.query(Account).filter_by(email=userEmail).first()

        #If user is not in db then user is added 
        if user == None:
            new_user=Account(email=userEmail)
            db_session.add(new_user)
            db_session.commit()
            db_session.close()
        return True
    else:
        return False


# Change home.html to the home template we want and change the Auth0 links from localhost to what we actually want
@app.route("/")
@cross_origin()
def home():
    return render_template("index.html", session=session.get('user'), pretty=json.dumps(session.get('user'), indent=4))

@app.route("/user")
@cross_origin()
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
@cross_origin()
def requests():
    if isAuthorised():
        user_email = session.get('user').get('userinfo').get('email')
        with Session(engine) as db_session:
            user_id = db_session.query(Account).filter(Account.email == user_email).first().id
            # Query to find orders which are not being fulfilled
            unfulfilled_orders = db_session.query(Order).filter_by(fulfilled=None).all()
            # Query to find orders which are being fulfilled by the user logged in
            my_orders = db_session.query(Order).filter_by(fulfilled=user_id).all()

            # Check if orders are retrieved
            # If no data after retrievel will make error field
            # MUST CHECK FOR ERROR WHEN USING THE JSON
            if not unfulfilled_orders:
                unfulfilled_orders_list = [
                    {
                        "error": "No unfulfilled orders :)"
                    }
                ]
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
                my_orders_list = [
                    {
                        "error": "You have not chosen any orders to fulfil :("
                    }
                ]
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

            combination = [my_orders_list,unfulfilled_orders_list]


            return json.dumps(combination, sort_keys=False)
    else:
        return redirect(url_for("login"))

@app.route("/create-request", methods=["POST"])
@cross_origin()
def createRequest():
    if isAuthorised():
        data = request.get_json()

        # Extract the order data
        message = data.get("message")
        # account_id = data.get("account_id")
        lat = data.get("lat")
        lng = data.get("lng")
        address = data.get("address")
        collection_time = data.get("collectionTime")
        items = data.get("items")

        userEmail = session.get('user').get('userinfo').get('email')
        user = db_session.query(Account).filter_by(email=userEmail).first()

        # Create the new Order
        new_order = Order(
            message=message,
            account_id=user.id,
            lat=lat,
            lng=lng,
            address=address,
            collectionTime=collection_time,
            fufullied=None  # Initially, order is not fulfilled
        )

        # Add the order to the session and commit
        with Session() as db_session:
            db_session.add(new_order)
            db_session.commit()

            # Add the items to the OrderItem table
            for item in items:
                order_item = OrderItem(
                    order_id=new_order.id,
                    name=item['name'],
                    quantity=item['quantity']
                )
                db_session.add(order_item)
            
            db_session.commit()

        # Redirect to the view request page with the new order's ID
        return redirect(url_for("viewRequest", order_id=new_order.id))
    else:
        return redirect(url_for("login"))

@app.route("/fulfil-request")
@cross_origin()
def fulfilRequest():
    if isAuthorised():

        with Session(engine) as db_session:
            pass

        #ORDER HERE IS FOR TESTING PURPOSES REPLACE WITH ORDERID OF ORDER TO BE FURFILLED
        new_order = Order(message='pending', account_id=5, lat="aa", lng="aaa", fufullied=0, collectionTime=1)  
        db_session.add(new_order)
        db_session.commit()
        
        userEmail = session.get('user').get('userinfo').get('email')

        #Finds the user who wants to furfill the order 
        user = db_session.query(Account).filter_by(email=userEmail).first()

        #FINDS order to be furfilled and updates furfilled attribute of the model 
        #Replace filterbyid field with the order to be furfilled 
        order = db_session.query(Order).filter_by(id=new_order.id).first()
        order.fulfilled = user.id

        thing = order.fulfilled 
        
        db_session.commit()
        db_session.close()
        return str(thing)
    else:
        return redirect(url_for("login"))

@app.route("/completed-request")
@cross_origin()
def completeRequest():

    with Session(engine) as db_session:
        pass

    userEmail = session.get('user').get('userinfo').get('email')
    user = db_session.query(Account).filter_by(email=userEmail).first()

    #ORDER HERE IS FOR TESTING PURPOSES REPLACE WITH ORDERID OF ORDER TO BE FURFILLED
    new_order = Order(message='pending', account_id=5, lat="aa", lng="aaa", fufullied=user.id, collectionTime=1)  
    db_session.add(new_order)
    db_session.commit()

    order_to_delete = db_session.query(Order).filter_by(id=new_order.id).first()
    db_session.delete(order_to_delete)
    db_session.commit()
    db_session.close()

    return "ORDER DELETED"


import os.path

def root_dir():  # pragma: no cover
    return os.path.abspath(os.path.dirname(__file__))


def get_file(filename):  # pragma: no cover
    try:
        src = os.path.join(root_dir(), filename)
        # Figure out how flask returns static files
        # Tried:
        # - render_template
        # - send_file
        # This should not be so non-obvious
        return open(src).read()
    except IOError as exc:
        return str(exc)

@app.route('/<path:path>')
def get_resource(path):  # pragma: no cover
    mimetypes = {
        ".css": "text/css",
        ".html": "text/html",
        ".js": "application/javascript",
    }
    complete_path = os.path.join(root_dir(), "static", path)
    ext = os.path.splitext(path)[1]
    mimetype = mimetypes.get(ext, "text/html")
    content = get_file(complete_path)
    return Response(content, mimetype=mimetype)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=env.get("PORT", 3000))
