import csv
# Example file path: '/Users/oliverbruno/Documents/GitHub/Software-Engineering-Project/backend/testFile.csv'
file_path = '' # Actual File Path goes here

file = open(file_path)
reader = csv.reader(file)
header = next(reader) # Pulls the first row of the csv file

rows = []
for row in reader: # Loads every row into a big array full of arrays
    rows.append(row)
file.close()

# Rows are in following format:
# Name, ID, Price, Notes