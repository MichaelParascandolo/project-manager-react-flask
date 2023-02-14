from flask import Flask, appcontext_popped, render_template, redirect, request, session
from flask_session import Session

api = Flask(__name__)
api.config["SESSION_PERMANENT"] = False
api.config["SESSION_TYPE"] = "filesystem"
Session(api)

@api.route('/')
def index():
    if not session.get("name"):
        # if not there in the session then redirect to the login page
        return redirect("/signin")
    return redirect('/Home')

@api.route('/signin', methods=["POST", "GET"])
def default():
    if request.method == "POST":
        session["name"] = request.form.get("name") # Grabs username
        # Need signin.tsx to have an actionable signin to keep testing this
        return redirect('/Home')
    return redirect('/')


@api.route('/Home')
def Home():
    return render_template('Home.tsx')


@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Michael",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body