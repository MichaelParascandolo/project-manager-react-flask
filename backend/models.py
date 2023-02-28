from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32),primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True, nullable = False)
    password = db.Column(db.Text, nullable=False)

class Employees(db.Model):
    __tablename__ = "EMPLOYEE"
    Employeeid = db.Column(db.Integer, primary_key=True, unique=True, nullable = False)
    Email = db.Column(db.String(345), unique=True, nullable = False)
    Password = db.Column(db.Text, nullable=False)
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    PhoneNumber = db.Column(db.Integer, nullable = False)
    Admin = db.Column(db.Boolean, nullable=False)
    DateHired = db.Column(db.Date, default = datetime.utcnow, nullable=True)

class Customers(db.Model):
    __tablename__ = "CUSTOMER"
    Customerid = db.Column(db.Integer,primary_key=True, unique=True)
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    Email = db.Column(db.String(345), unique=True, nullable=False)
    City = db.Column(db.Text, nullable=False)
    Street = db.Column(db.Text, nullable=False)
    PhoneNumber = db.Column(db.Integer, nullable=False)

class Generators(db.Model):
    __tablename__ = "GENERATOR"
    Generatorid = db.Column(db.Integer, primary_key=True, unique=True)
    Name = db.Column(db.String(50), nullable=False)
    Cost = db.Column(db.Double(5,2), nullable=False)
    Notes = db.Column(db.Text, nullable=True)

class ServiceRecords(db.Model):
    __tablename__ = "SERVICE_RECORD"
    Serviceid = db.Column(db.Integer, primary_key=True, unique=True)
    Customerid = db.Column(db.Integer, db.ForeignKey('CUSTOMER.Customerid'), nullable=False)
    ServiceCustomer = db.relationship("Customers", backref=db.backref("CUSTOMER", uselist=False))
    Employeeid = db.Column(db.Integer, db.ForeignKey('EMPLOYEE.Employeeid'), nullable=False)
    ServiceEmployee = db.relationship("Employees", backref=db.backref("EMPLOYEE", uselist=False))
    Generatorid = db.Column(db.Integer, db.ForeignKey('GENERATOR.Generatorid'), nullable=False)
    ServiceGenerator = db.relationship("Generators", backref = db.backref("GENERATOR", uselist=False))
    ServicePerformed = db.Column(db.Boolean, nullable=False)
    DatePerformed = db.Column(db.DateTime, nullable=False)
    Notes = db.Column(db.Text, nullable=True)