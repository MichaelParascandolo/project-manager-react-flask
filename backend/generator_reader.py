import csv

file = open('/Users/oliverbruno/Documents/GitHub/Software-Engineering-Project/backend/testFile.csv')
reader = csv.reader(file)
header = next(reader)

rows = []
for row in reader:
    rows.append(row)
file.close()

print(header)
print(rows)