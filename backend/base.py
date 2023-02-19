# following this as a guide 
# https://dev.to/nagatodev/how-to-add-login-authentication-to-a-flask-and-react-application-23i7
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager


api = Flask(__name__)
CORS(api)

api.config["JWT_SECRET_KEY"] = "aosdflnasldfnaslndflnsdnlnlknlkgtudsrtstr"
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(api)

@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response

@api.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response

@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

# this function should return an array of employee objects with: 
# firstName, lastName, employeeID, and their username and password
@api.route("/employees", methods=["GET"])
def team():
    get_employees = jsonify({"John Appleseed"})
    return get_employees

@api.route("/profile", methods=["GET"])
# @jwt_required()
# this should be here to makes sure the user has a token but it does not work . . .
def my_profile():
    response_body = {
        "firstName": "Michael",
        "lastName": "Parascandolo",
        "Admin": True,
    }

    return response_body