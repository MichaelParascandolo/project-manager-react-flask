from flask import Flask
import csv
from models import db, Generators
from config import ApplicationConfig
from flask_cors import CORS

api = Flask(__name__) # Making it talk to 
CORS(api)
api.config['CORS_HEADERS'] = 'Content-Type'
api.config.from_object(ApplicationConfig)
db.init_app(api) # Making it talk to Database

with api.app_context():
    db.create_all()

@api.route('/generator/create', methods=["GET"])
def reader():
    # Example file path: '/Users/oliverbruno/Documents/GitHub/Software-Engineering-Project/backend/testFile.csv'
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
    # Rows are in following format:
    # Name, ID, Price, Notes
    return