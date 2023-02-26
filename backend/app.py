from flask import Flask, request, abort, jsonify
from flask_bcrypt import Bcrypt
from config import ApplicationConfig
from models import db, Employees, Customers, Generators, ServiceRecords

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
db.init_app(app)

with app.app_context():
    db.create_all()

#Test route from video

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

#Creates a new employee in the database, and checks for different types of errors while creating

@app.route("/employee/create", methods=["POST"])
def create_employee():
    id = request.json["EmployeeID"]
    email = request.json["Email"]
    password = request.json["Password"]
    firstname = request.json["First Name"]
    lastname = request.json["Last Name"]

    employee_exists = Employees.query.filter_by(id = id).first() is not None

    if employee_exists:
        abort(409)

    hashed_password = bcrypt.generate_password_hash(password)
    new_employee = Employees(id = id, email = email, password = hashed_password, firstname = firstname, lastname = lastname)
    db.session.add(new_employee)
    db.session.commit()

    return jsonify({
        "ID": new_employee.id,
        "Email": new_employee.email,
        "First Name": new_employee.firstname,
        "Last Name": new_employee.lastname
        })

#Creates a new Customer in the database, checks for any errors while creating

@app.route("/customer/create", methods=["POST"])
def create_customer():
    id = request.json["CustomerID"]
    firstname = request.json["First Name"]
    lastname = request.json["Last Name"]
    email = request.json["Email"]
    city = request.json["City"]
    street = request.json["Street"]
    phonenumber = request.json["Phone Number"]
    
    customer_exists = Customers.query.filter_by(id = id).first() is not None

    if customer_exists:
        abort(409)

    new_customer = Customers(id = id, firstname = firstname, lastname = lastname, email = email, city = city, street = street, phonenumber = phonenumber)
    db.session.add(new_customer)
    db.session.commit()

    return jsonify({
        "ID": new_customer.id,
        "First Name": new_customer.firstname,
        "Last Name": new_customer.lastname,
        "Email": new_customer.email,
        "City": new_customer.city,
        "Street": new_customer.street,
        "Phone Number": new_customer.phonenumber
        })

#Creates a new generator in the database, checks for errors while creating

@app.route("/generator/create", methods=["POST"])
def create_generator():
    id = request.json["CustomerID"]
    name = request.json["Name"]
    cost = request.json["Price"]
    notes = request.json["Notes"]
    
    generator_exists = Generators.query.filter_by(id = id).first() is not None

    if generator_exists:
        abort(409)

    new_generator = Generators(id = id, name = name, cost = cost, notes = notes)
    db.session.add(new_generator)
    db.session.commit()

    return jsonify({
        "ID": new_generator.id,
        "Name": new_generator.name,
        "Cost": new_generator.cost,
        "Notes": new_generator.notes
        })

#Creates a new service record in the database, checks for errors while creating

@app.route("/service/create", methods=["POST"])
def create_service():
    id = request.json["ServiceID"]
    customerid = request.json["CustomerID"]
    employeeid = request.json["EmployeeID"]
    generatorid = request.json["GeneratorID"]
    performed = request.json["Service Performed"]
    date = request.json["Date Performed"]
    notes = request.json["Notes"]
    
    service_exists = ServiceRecords.query.filter_by(id = id).first() is not None

    if service_exists:
        abort(409)

    new_service = ServiceRecords(id = id, customerid = customerid, employeeid = employeeid, generatorid = generatorid, performed = performed, date = date, notes = notes)
    db.session.add(new_service)
    db.session.commit()

    return jsonify({
        "ID": new_service.id,
        "Customer Name": new_service.customerid,
        "Employee Name": new_service.employeeid,
        "Generator Type": new_service.generatorid,
        "Service Performed": new_service.servicePerformed,
        "Date Performed": new_service.DatePerformed,
        "Phone Number": new_service.phonenumber
        })


if __name__ == "__main__":
    app.run(debug=True)