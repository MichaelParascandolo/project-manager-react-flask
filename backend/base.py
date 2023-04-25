# following this as a guide 
# https://dev.to/nagatodev/how-to-add-login-authentication-to-a-flask-and-react-application-23i7
from flask import Flask, request, jsonify, json, abort
from flask_bcrypt import Bcrypt
from config import ApplicationConfig
from sqlalchemy import or_, and_
from flask_cors import CORS, cross_origin
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from models import db, Employees, Customers, Generators, ServiceRecords, Service_Employee_Int, Password_Recovery
import csv, secrets, string, random



api = Flask(__name__)
CORS(api)
api.config['CORS_HEADERS'] = 'Content-Type'
api.config.from_object(ApplicationConfig)
bcrypt = Bcrypt(api)
db.init_app(api)

with api.app_context():
    db.create_all()
    file_path = 'testFile.csv' # Actual File Path goes here
    file = open(file_path)
    reader = csv.reader(file)
    header = next(reader)  # Pulls the first row of the csv file

    for row in reader:
        if Generators.query.filter_by(Generatorid = row[1]).first() is None: # Loads every row into a big array full of arrays
            new_generator = Generators(Generatorid = row[1], Name = row[0], Cost = row[2], Notes = row[3])
            db.session.add(new_generator)
            db.session.commit()
    file.close()

api.config["JWT_SECRET_KEY"] = "aosdflnasldfnaslndflnsdnlnlknlkgtudsrtstr"
jwt = JWTManager(api)

# we might not need this code anymore
# api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
# @api.after_request
# def refresh_expiring_jwts(response):
#     try:
#         exp_timestamp = get_jwt()["exp"]
#         now = datetime.now(timezone.utc)
#         target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
#         if target_timestamp > exp_timestamp:
#             access_token = create_access_token(identity=get_jwt_identity())
#             data = response.get_json()
#             if type(data) is dict:
#                 data["access_token"] = access_token 
#                 response.data = json.dumps(data)
#         return response
#     except (RuntimeError, KeyError):
#         # Case where there is not a valid JWT. Just return the original response
#         return response


#The login route
@api.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    remember = request.json.get("remember", None)

    forgot = request.json.get("forgot", None)

    user = Employees.query.filter_by(Email=email).first()
    user = Employees.query.filter_by(Email=email).first()
    access_token = create_access_token(identity=email)
    if user is None:
        return {"msg": "User Not Found"}, 401
    
    if not bcrypt.check_password_hash(user.Password, password):
        return {"msg": "Invalid Password"}, 401

    if remember:
        expires_delta = timedelta(days=7)
    else:
        expires_delta = timedelta(minutes=30)

    access_token = create_access_token(identity=email,expires_delta=expires_delta)
    response = {"access_token":access_token}

    return response


#The log out route
@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "Logout Successful"})
    unset_jwt_cookies(response)
    return response


# this function should return an array of employee objects with: 
# firstName, lastName, employeeID, and their username and password
@api.route('/employees', methods=["GET"])
@jwt_required()
def team():
    
    team_list = []
    for i in Employees.query.all():
        employee = {
            "fN" : i.FirstName,
            "lN" : i.LastName,
            "id" : i.Employeeid,
            "admin": i.Admin,
            "email": i.Email,
            "phone" : i.PhoneNumber,
            "hiredDate" : i.DateHired,
        }
        team_list.append(employee)
    return team_list
    
#Password Recovery Route, creates a new code for the user
@api.route("/recovery/create", methods=["POST"])
def create_code():
    eid1 = request.json["EmployeeID"]
    datemade = request.json["creationDate"]

    user = Employees.query.filter_by(Employeeid = eid1).first()
    for i in Password_Recovery.query.filter_by(Email = user.Email).all():
        db.session.delete(i)

    code = ("".join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=10)))
    new_recovery = Password_Recovery(Code = code, Email = user.Email, Password = user.Password, DateMade = datemade)
    db.session.add(new_recovery)
    
    db.session.commit()
    return {"Code": new_recovery.Code}

#Password Recovery Route, checks that the code is correct and displays your password
@api.route("/recovery/check", methods=["POST"])
def check_code():
    email = request.json["email"]
    code = request.json["code"]
    new_password = request.json["new_password"]

    recovery = Password_Recovery.query.filter_by(Email = email).first()
    if recovery.Code == code:
        emp = Employees.query.filter_by(Email = email).first()
        emp.Password = bcrypt.generate_password_hash(new_password)
        db.session.delete(recovery)
        db.session.commit()
        return {"msg": "New Password Created"}
    else:
        return {"msg": "Invalid Code"}, 401

@api.route("/recovery/display", methods=["POST"])
@jwt_required()
def see_code():
    eid1 = request.json["EmployeeID"]
    emp = Employees.query.filter_by(Employeeid = eid1).first()
    recovery = Password_Recovery.query.filter_by(Email = emp.Email).first()
    
    return {"Code": recovery.Code}


#returns the currently logged in user's firstname and permission level
@api.route("/profile", methods=["GET"])
@jwt_required()
def my_profile():
    user = Employees.query.filter_by(Email=get_jwt_identity()).first()
    response_body = {
        "firstName": user.FirstName,
        "Admin": user.Admin,
        "ID": user.Employeeid
    }

    return response_body

#Creating employees route
@api.route("/employees/create", methods=["POST"])
@cross_origin()
@jwt_required()
def create_employee():
    id1 = request.json["EmployeeID"]
    email1 = request.json["Email"]
    password1 = request.json["Password"]
    firstname1 = request.json["First Name"]
    lastname1 = request.json["Last Name"]
    phonenumber1 = request.json["Phone Number"]
    admin1 = request.json["Admin"]
    dateHired = request.json["hiredDate"]

    employee_exists = Employees.query.filter_by(Employeeid = id1).first() is not None

    if employee_exists:
        abort(409)

    hashed_password = bcrypt.generate_password_hash(password1)
    new_employee = Employees(Employeeid = id1, Email = email1, Password = hashed_password, FirstName = firstname1, LastName = lastname1, PhoneNumber = phonenumber1, Admin = admin1, DateHired = dateHired)
    db.session.add(new_employee)
    db.session.commit()

    return jsonify({
        "ID": new_employee.Employeeid,
        "Email": new_employee.Email,
        "First Name": new_employee.FirstName,
        "Last Name": new_employee.LastName
        })


#Deleting employees route
@api.route("/employees/delete", methods=["POST"])
@cross_origin()
@jwt_required()
def delete_employee():
    # only an admin can delete employees
    user = Employees.query.filter_by(Email=get_jwt_identity()).first()
    if user.Admin == True:
        reqs = request.get_json()
        id1 = reqs.get("EmployeeID")

        employee_exists = Employees.query.filter_by(Employeeid = id1).first() is not None

        if not employee_exists:
            abort(409)
            
        Employees.query.filter_by(Employeeid = id1).delete()
        db.session.commit()
        
        return jsonify({"ID": id1})


#Changes user between admin/user
@api.route("/employees/permission", methods=["POST"])
@cross_origin()
@jwt_required()
def change_permission():
    empID = request.json.get("EmployeeID", None)

    user = Employees.query.filter_by(Employeeid = empID).first()

    if user is None:
        abort(409)
        
    user.Admin = not user.Admin
    db.session.commit()
    
    return jsonify({"Permission changed for ID": empID})
    

#Search and Display Customers    
@api.route("/customer/display", methods=["POST"])
@cross_origin()
@jwt_required()
def display_customers():

    reqs = request.get_json()
    searchTerm = reqs.get("Search")
    customer_list = []
    user = Employees.query.filter_by(Email=get_jwt_identity()).first()
    for i in Customers.query.filter(or_(Customers.FirstName.like('%' + searchTerm + '%'),
                                        Customers.LastName.like('%' + searchTerm + '%'))):
        customer = {
            "ID": i.Customerid,
            "FirstName": i.FirstName,
            "LastName": i.LastName,
            "Email": i.Email,
            "Phone": i.PhoneNumber,
            "City": i.City,
            "Street": i.Street,
            "State": i.State,
            "ZIP": i.ZIP
        }
        customer_list.append(customer)
    return jsonify({"customers":customer_list, "admin": user.Admin})


#Shows all of a single customer's details
@api.route("/customer/details", methods=["POST"])
@cross_origin()
@jwt_required()
def customer_details():
    reqs = request.get_json()
    id1 = reqs.get("clientID")
    user = Employees.query.filter_by(Email=get_jwt_identity()).first()
    i = Customers.query.filter_by(Customerid = id1).first()

    customer = {
            "ID": i.Customerid,
            "FirstName": i.FirstName,
            "LastName": i.LastName,
            "Email": i.Email,
            "Phone": i.PhoneNumber,
            "City": i.City,
            "Street": i.Street,
            "State": i.State,
            "ZIP": i.ZIP
        }

    return jsonify({"details":customer, "admin": user.Admin})



#Creating Customers
@api.route('/customer/create', methods=["POST"])
@cross_origin()
@jwt_required()
def create_customer():
    id1 = request.json["CustomerID"]
    firstname1 = request.json["First Name"]
    lastname1 = request.json["Last Name"]
    email1 = request.json["Email"]
    city1 = request.json["City"]
    street1 = request.json["Street"]
    phonenumber1 = request.json["Phone Number"]
    state1 = request.json["State"]
    Zip1 = request.json["ZIP Code"]
    
    customer_exists = Customers.query.filter_by(Customerid = id1).first() is not None

    if customer_exists:
        abort(409)

    new_customer = Customers(Customerid = id1, FirstName = firstname1, LastName = lastname1, Email = email1, City = city1, Street = street1, PhoneNumber = phonenumber1, State = state1, ZIP = Zip1)
    db.session.add(new_customer)
    db.session.commit()

    return jsonify({
        "ID": new_customer.Customerid,
        "First Name": new_customer.FirstName,
        "Last Name": new_customer.LastName,
        "Email": new_customer.Email,
        "City": new_customer.City,
        "Street": new_customer.Street,
        "State": new_customer.State,
        "ZIP": new_customer.ZIP,
        "Phone Number": new_customer.PhoneNumber
        })

#Deleting Customers
@api.route("/customer/delete", methods=["POST"])
@cross_origin()
@jwt_required()
def delete_customer():
    reqs = request.get_json()
    id1 = reqs.get("CustomerID")

    customer_exists = Customers.query.filter_by(Customerid = id1).first() is not None

    if not customer_exists:
        abort(409)

    Customers.query.filter_by(Customerid = id1).delete()
    db.session.commit()

    return jsonify({"ID": id1})


#Creates a new service record in the database, checks for errors while creating
@api.route("/service/create", methods=["POST"])
@jwt_required()
def create_service():
    id1 = request.json["ServiceID"]
    customerid1 = request.json["CustomerID"]
    generatorid1 = request.json["GeneratorID"]
    performed1 = request.json["ServicePerformed"]
    startdate1 = request.json["Date"]
    starttime1 = request.json["Time"]
    reqs = request.get_json()
    servicetype1 = reqs.get("ServiceType")
    notes1 = request.json["Notes"]
    
    service_exists = ServiceRecords.query.filter_by(Serviceid = id1).first() is not None

    if service_exists:
        abort(409)

    new_service = ServiceRecords(Serviceid = id1, Customerid = customerid1, Generatorid = generatorid1, ServicePerformed = performed1, ServiceType = servicetype1, StartDate = startdate1, StartTime = starttime1, Notes = notes1)
    
    db.session.add(new_service)
    db.session.commit()

    return jsonify({
        "ID": new_service.Serviceid,
        "Customer Name": new_service.Customerid,
        "Generator Type": new_service.Generatorid,
        "Service Performed": new_service.ServicePerformed,
        "Start Date": new_service.StartDate,
        "Start Time": new_service.StartTime,
        "Notes": new_service.Notes
        })

@api.route("/generators/details", methods=["GET"])
@jwt_required()
def retrieve_generators():
    gList = []
    for g in Generators.query.all():
        generator =  {
            "gID" : g.Generatorid,
            "gName" : g.Name,
            "gCost" : g.Cost,
            "gNotes" : g.Notes
        }
        gList.append(generator)

    return gList

@api.route("/service/details", methods=["POST"])
@jwt_required()
def retrieve_services():
    reqs = request.get_json()
    id1 = reqs.get("CustomerID")
    services = []

    if id1 is None:
        # If no CustomerID provided, return all service records for all customers
        for i in ServiceRecords.query.all():
            gName = Generators.query.filter_by(Generatorid = i.Generatorid).first()
            services.append({
                "CustomerID": i.Customerid,
                "Generator": gName.Name,
                "ServiceType": i.ServiceType,
                "Date": i.StartDate,
                "Time": i.StartTime,
                "Notes": i.Notes,
            })
    else:
        # If a CustomerID is provided, return service records for that customer
        service_exists = ServiceRecords.query.filter_by(Customerid = id1).first() is not None

        if not service_exists:
            abort(409)

        for i in ServiceRecords.query.filter_by(Customerid = id1).all():
            gName = Generators.query.filter_by(Generatorid = i.Generatorid).first()
            services.append({
                "Generator": gName.Name,
                "ServiceType": i.ServiceType,
                "Date": i.StartDate,
                "Time": i.StartTime,
                "Notes": i.Notes,
            })

    return services




#edit jobs from schedule page
#Doable by admin accounts
@api.route("/schedule/edit", methods=["POST"])
@jwt_required()
def edit_Job():
    #Checking that user is Admin
    user = Employees.query.filter_by(Email=get_jwt_identity()).first()
    reqs = request.get_json()
    sid = reqs.get("ServiceID")
    generatorname = reqs.get("GeneratorName")
    startdate = reqs.get("Date")
    starttime = reqs.get("Time")
    servicetype = reqs.get("ServiceType")
    notes = reqs.get("Notes")

    if user.Admin == True:
        service = ServiceRecords.query.filter_by(Serviceid = sid).first()
        service.Generatorid = generatorname
        service.StartDate = startdate
        service.StartTime = starttime
        service.ServiceType = servicetype
        service.Notes = notes
        
        db.session.commit()
        
        return jsonify({
        "service_id": sid,
        "generator_name": generatorname,
        "start_date": startdate,
        "start_time": starttime,
        "service_type": servicetype,
        "notes": notes,
    })

    return
    
#Adds technicians to jobs
#Doable by admins
@api.route("/schedule/techs", methods = ["POST"])
@jwt_required()
def add_techs():  
    
    #Checking that user is Admin
    user = Employees.query.filter_by(Email=get_jwt_identity()).first()

    if user.Admin == True:
        reqs = request.get_json()
        sid = reqs.get("ServiceID")
        tech_id = []
        tech_id.append(request.json["FirstEmployeeID"])
        tech_id.append(request.json["SecondEmployeeID"])
        tech_id.append(request.json["ThirdEmployeeID"])
        tech_id.append(request.json["FourthEmployeeID"])

        for i in Service_Employee_Int.query.filter_by(Serviceid = sid).all():
            db.session.delete(i)
            db.session.commit()

        for k in tech_id:
            if k != "default":
                assigned = Service_Employee_Int(Serviceid = sid, Employeeid = k)
                db.session.add(assigned)
        
        db.session.commit()

        return jsonify({
            "ServiceID": sid,
            "First_Employee_ID": tech_id[0],
            "Second_Employee_ID": tech_id[1],
            "Third_Employee_ID": tech_id[2],
            "Fourth_Employee_ID": tech_id[3],
        })

# Completes a job from the schedule page and sets the finish date/time 
# Doable by everyone who this shows up for
@api.route("/schedule/complete", methods = ["POST"])
@jwt_required()
def complete_job():
    reqs = request.get_json()
    sid = reqs.get("ServiceID")
    finishdate = reqs.get("completeDate")
    finishtime = reqs.get("completeTime")
    service = ServiceRecords.query.filter_by(Serviceid = sid).first()
    
    if service.ServicePerformed == False:
        service.ServicePerformed = True
        service.FinishDate = finishdate
        service.FinishTime = finishtime
    else:
        service.ServicePerformed = False
        service.FinishDate = None
        service.FinishTime = None
    
    
 
    db.session.commit()

    return jsonify({
        "ServiceID": service.Serviceid,
        "Service_Performed": service.ServicePerformed,
        "Finish Date": service.FinishDate,
        "Finish Time": service.FinishTime
    })

#Displays Upcoming Services
@api.route("/schedule/display", methods = ["POST"])
@jwt_required()
def get_all_services():
    start_date = request.json.get("startDate", None)
    end_date = request.json.get("endDate", None)
    services = []
    techs = []
    user = Employees.query.filter_by(Email=get_jwt_identity()).first()
    if start_date is None and end_date is None:
        service_records = ServiceRecords.query.all()
    else:
        service_records = ServiceRecords.query.filter(ServiceRecords.StartDate.between(start_date, end_date)).all()
    
    #This Code May No Longer Be Necessary
    #if not service_records:
       # return jsonify({'message': 'no jobs found'})

    for service in service_records:
        customer = Customers.query.filter_by(Customerid=service.Customerid).first()
        generator = Generators.query.filter_by(Generatorid=service.Generatorid).first()

        if user.Admin == True:
            for ser_emp_int in Service_Employee_Int.query.filter_by(Serviceid = service.Serviceid).all():
                emp = Employees.query.filter_by(Employeeid = ser_emp_int.Employeeid).first()
                techs.append({
                    'service_id': service.Serviceid,
                    'employee_first_name': emp.FirstName,
                    'employee_last_name': emp.LastName
                })

            services.append({
                'service_id': service.Serviceid,
                'customer_first_name': customer.FirstName,
                'customer_last_name': customer.LastName,
                'city': customer.City,
                'street': customer.Street,
                'generator_name': generator.Name,
                'service_type': service.ServiceType,
                'start_date': service.StartDate,
                'start_time': service.StartTime,
                'finish_date': service.FinishDate,
                'finish_time': service.FinishTime,
                'notes': service.Notes
            })

        else:
            for guy in Service_Employee_Int.query.filter_by(Employeeid = user.Employeeid).all():
                if service.Serviceid == guy.Serviceid:
                    techs.append({
                        'service_id': service.Serviceid,
                        'employee_first_name': user.FirstName,
                        'employee_last_name': user.LastName
                    })

                    services.append({
                        'service_id': service.Serviceid,
                        'customer_first_name': customer.FirstName,
                        'customer_last_name': customer.LastName,
                        'city': customer.City,
                        'street': customer.Street,
                        'generator_name': generator.Name,
                        'service_type': service.ServiceType,
                        'start_date': service.StartDate,
                        'start_time': service.StartTime,
                        'finish_date': service.FinishDate,
                        'finish_time': service.FinishTime,
                        'notes': service.Notes
                    })

    return jsonify({'services': services, 'techs': techs, 'team': team(), 'admin': user.Admin, 'generators': retrieve_generators()})

#Deletes Jobs from the schedule page
#Doable by Admins
@api.route("/schedule/delete", methods = ["POST"])
@jwt_required()
def delete_job():
    
    #Checking if logged in user is an admin
    user = Employees.query.filter_by(Email=get_jwt_identity()).first()

    if user.Admin == True:
        reqs = request.get_json()
        id1 = reqs.get("ServiceID")

        service_exists = ServiceRecords.query.filter_by(Serviceid = id1).first() is not None

        if not service_exists:
            abort(409)

        badrecord = ServiceRecords.query.filter_by(Serviceid = id1).first()
        #Deletes ser_emp_int records that go with the service record being deleted
        for i in Service_Employee_Int.query.filter_by(Serviceid = id1).all():
            db.session.delete(i)
        db.session.delete(badrecord)
        db.session.commit()

    return jsonify({"ID": id1})