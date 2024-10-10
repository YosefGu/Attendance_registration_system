from pymongo import MongoClient
from config import Config
import openpyxl

client = MongoClient(Config.MONGO_URI)
db = client['Attendance_registration_system']
students_collection = db['students']

# Get all students
def get_all_students():
    return students_collection.find()

# Get a student
def get_student(id):
    return students_collection.find_one(id)

# Add student
def add_student(data):
    name, lName, id, parentA, phoneA = data.values()
    if not name or not lName or not id or not parentA or not phoneA:
        raise ValueError("The fields - name, lname, parentA, phoneA, MUST be filled ")
    exists = students_collection.find_one({"id": id})
    if exists:
        raise ValueError("The student allready exists.")
    result = students_collection.insert_one(data)
    return str(result.inserted_id)
    
# Add students list by exel file
def add_students_file(file):
    if not file.filename.endswith('.xlsx'):
        raise ValueError("Invalid file format, only .xlsx allowed")
    
    workbook = openpyxl.load_workbook(file)
    sheet = workbook.active
    for row in sheet.iter_rows(min_row=2, values_only=True):
        fName, lName, id, parentA, phoneA, parentB, phoneB = row
        student = {
            "name" : fName,
            "lName": lName,
            "id": id,
            "parentA": parentA,
            "phoneA": phoneA,
            "parentB": parentB,
            "phoneB": phoneB
        }
        exists = students_collection.find_one({"id": id})
        if not exists:
            students_collection.insert_one(student)
    return "File processed successfully"

# Update a student
def update_student(student_id, student):
    return students_collection.find_one_and_update(
        {"_id": student_id},
        {"$set": student},
        return_document=True
    )

# Delete student
def delete_student(id):
    return students_collection.find_one_and_delete({"_id": id})