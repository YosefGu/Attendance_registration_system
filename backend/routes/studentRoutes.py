from flask import Blueprint
from controllers.studentControllers import Student


students = Blueprint('Students', __name__)

@students.route('/students', methods=['GET'])
def get_all_students_route():
    return Student.get_all_students_()

@students.route('/students-file', methods=['POST'])
def add_students_file():
    return Student.add_students_file()

@students.route('/student', methods=['POST'])
def add_student_route():
    return Student.add_student_()

@students.route('/student/<id>', methods=['GET'])
def get_student_route(id):
    return Student.get_student_(id)

@students.route('/student/<id>', methods=['PUT'])
def update_student_route(id):
    return Student.update_student_(id)

@students.route('/student/<id>', methods=['DELETE'])
def delete_student_route(id):
    return Student.delete_student_(id)

