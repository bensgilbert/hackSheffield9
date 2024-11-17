import json
from os import environ as env
from urllib.parse import quote_plus, urlencode

from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, session, url_for

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session, sessionmaker
from sqlalchemy import create_engine, null, select, update
from models import Order, Account, engine
from sqlalchemy.ext.declarative import declarative_base

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
def home():
    return render_template("test.html", session=session.get('user'), pretty=json.dumps(session.get('user'), indent=4))

@app.route("/user")
def userProfile():
    if isAuthorised():
        # Get userEmail from the session to fetch user data from database
        return "get database data"
    else:
        return redirect(url_for("login"))

@app.route("/requests")
def requests():
    if isAuthorised():
        # get data from db into list
        return "list of requests"
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




if __name__ == "__main__":
    app.run(host="0.0.0.0", port=env.get("PORT", 3000))
