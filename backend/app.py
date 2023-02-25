from flask import Flask, request, abort, jsonify
from flask_bcrypt import Bcrypt
from config import ApplicationConfig
from models import db, Employees

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = Employees.query.filter_by(email=email).first() is not None

    if user_exists:
        abort(409)
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = Employees(email = email, password = hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

if __name__ == "__main__":
    app.run(debug=True)