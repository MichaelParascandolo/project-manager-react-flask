from flask import Flask, request, abort, jsonify
from flask_bcrypt import Bcrypt
from config import ApplicationConfig
from models import db, Employees, Customers, Generators, ServiceRecords,User

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
db.init_app(app)

with app.app_context():
    db.create_all()

#Test route from video

@app.route("/register", methods=["POST"])
def register_user():
    email1 = request.json["email"]
    password1 = request.json["password"]

    user_exists = User.query.filter_by(email = email1).first() is not None

    if user_exists:
        abort(409)
    
    hashed_password = bcrypt.generate_password_hash(password1)
    new_user = User(email = email1, password = hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

#Creates a new employee in the database, and checks for different types of errors while creating

@app.route("/employee/create", methods=["POST"])
def create_employee():
    id1 = request.json["EmployeeID"]
    email1 = request.json["Email"]
    password1 = request.json["Password"]
    firstname1 = request.json["First Name"]
    lastname1 = request.json["Last Name"]

    employee_exists = Employees.query.filter_by(Employeeid = id1).first() is not None

    if employee_exists:
        abort(409)

    hashed_password = bcrypt.generate_password_hash(password1)
    new_employee = Employees(Employeeid = id1, Email = email1, Password = hashed_password, FirstName = firstname1, LastName = lastname1)
    db.session.add(new_employee)
    db.session.commit()

    return jsonify({
        "ID": new_employee.Employeeid,
        "Email": new_employee.Email,
        "First Name": new_employee.FirstName,
        "Last Name": new_employee.LastName
        })

#Creates a new Customer in the database, checks for any errors while creating

@app.route("/customer/create", methods=["POST"])
def create_customer():
    id1 = request.json["CustomerID"]
    firstname1 = request.json["First Name"]
    lastname1 = request.json["Last Name"]
    email1 = request.json["Email"]
    city1 = request.json["City"]
    street1 = request.json["Street"]
    phonenumber1 = request.json["Phone Number"]
    
    customer_exists = Customers.query.filter_by(Customerid = id1).first() is not None

    if customer_exists:
        abort(409)

    new_customer = Customers(id = id, firstname = firstname1, lastname = lastname1, email = email1, city = city1, street = street1, phonenumber = phonenumber1)
    db.session.add(new_customer)
    db.session.commit()

    return jsonify({
        "ID": new_customer.Customerid,
        "First Name": new_customer.FirstName,
        "Last Name": new_customer.LastName,
        "Email": new_customer.Email,
        "City": new_customer.City,
        "Street": new_customer.Street,
        "Phone Number": new_customer.PhoneNumber
        })

#Creates a new generator in the database, checks for errors while creating

@app.route("/generator/create", methods=["POST"])
def create_generator():
    id1 = request.json["CustomerID"]
    name1 = request.json["Name"]
    cost1 = request.json["Price"]
    notes1 = request.json["Notes"]
    
    generator_exists = Generators.query.filter_by(Generatorid = id1).first() is not None

    if generator_exists:
        abort(409)

    new_generator = Generators(Generatorid = id1, Name = name1, Cost = cost1, Notes = notes1)
    db.session.add(new_generator)
    db.session.commit()

    return jsonify({
        "ID": new_generator.Generatorid,
        "Name": new_generator.Name,
        "Cost": new_generator.Cost,
        "Notes": new_generator.Notes
        })

#Creates a new service record in the database, checks for errors while creating

@app.route("/service/create", methods=["POST"])
def create_service():
    id1 = request.json["ServiceID"]
    customerid1 = request.json["CustomerID"]
    employeeid1 = request.json["EmployeeID"]
    generatorid1 = request.json["GeneratorID"]
    performed1 = request.json["Service Performed"]
    date1 = request.json["Date Performed"]
    notes1 = request.json["Notes"]
    
    service_exists = ServiceRecords.query.filter_by(Serviceid = id1).first() is not None

    if service_exists:
        abort(409)

    new_service = ServiceRecords(Serviceid = id1, Customerid = customerid1, Employeeid = employeeid1, Generatorid = generatorid1, ServicePerformed = performed1, DatePerformed = date1, Notes = notes1)
    db.session.add(new_service)
    db.session.commit()

    return jsonify({
        "ID": new_service.Serviceid,
        "Customer Name": new_service.Customerid,
        "Employee Name": new_service.Employeeid,
        "Generator Type": new_service.Generatorid,
        "Service Performed": new_service.ServicePerformed,
        "Date Performed": new_service.DatePerformed,
        "Notes": new_service.Notes
        })

#Test Logging in

@app.route("/login", methods=["POST"])
def login_employee():
    email1 = request.json["Email"]
    password1 = request.json["Password"]

    user = Employees.query.filter_by(Email=email1).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.Password, password1):
        return jsonify({"error": "Unauthorized"}), 401
    
    return jsonify({
        "id": user.Employeeid,
        "email": user.Email
    })


if __name__ == "__main__":
    app.run(debug=True)