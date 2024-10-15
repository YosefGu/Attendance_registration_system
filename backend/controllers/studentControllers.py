from flask import request, jsonify
from models.studentModel import get_all_students, get_student, add_student, add_students_file, update_student, delete_student
from bson.json_util import dumps
from bson.objectid import ObjectId

class Student:
    @staticmethod
    def get_all_students_():
        try:
            cursor = get_all_students()
            students = list(cursor)
            if len(students) > 0:
                return dumps(students)
            else:
                return jsonify({"error":"Students NOT found."}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    @staticmethod    
    def get_student_(id):
        try:
            student_id = ObjectId(id)
            student = get_student(student_id)
            if student:
                return dumps(student)
            else:
                return jsonify({"error": "Student NOT found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @staticmethod    
    def add_student_():
        try:
            data = request.json
            student = add_student(data)
            return student, 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @staticmethod
    def add_students_file():
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        try:
            file = request.files['file']
            result = add_students_file(file) 
            return result, 201
        except Exception as e:
            return jsonify({"error": "An unexpected error.", "details":str(e)}, ), 500
    
    @staticmethod
    def update_student_(id):
        try:
            student_id = ObjectId(id)
            student = request.json
            result = update_student(student_id, student)
            if result:
                return dumps(result)
            else:
                return jsonify({"error": "Student NOT updated."}) 
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @staticmethod    
    def delete_student_(id):
        try:
            student_id = ObjectId(id)
            student = delete_student(student_id)
            if student:
                return jsonify({"message": "Student deleted successfuly", "id":id})
            else:
                return jsonify({"error": "Student NOT found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500  