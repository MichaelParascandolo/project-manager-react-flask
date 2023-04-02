import csv
from models import db, Generators


def reader():
    # Example file path: '/Users/oliverbruno/Documents/GitHub/Software-Engineering-Project/backend/testFile.csv'
    file_path = 'testFile.csv' # Actual File Path goes here
    file = open(file_path)
    reader = csv.reader(file)
    header = next(reader)  # Pulls the first row of the csv file

    rows = []
    for row in reader:
        if Generators.query.filter_by(GeneratorID = row[1]).first() is None: # Loads every row into a big array full of arrays
            db.session.add(
                Generators(Name = row[0], GeneratorID = row[1], Cost = row[2], Notes = row[3])
            )
            db.session.commit()
    file.close()
    # Rows are in following format:
    # Name, ID, Price, Notes

if __name__ == "__main__":
    reader()
