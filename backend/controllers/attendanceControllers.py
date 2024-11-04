from models.attendanceModel import get_attendance_list, add_attendance_list
from flask import jsonify, request
from bson.json_util import dumps

class Attendance:
    @staticmethod
    def get_attendance_list_():
        try:
            result = get_attendance_list()
            if result:
                return dumps(result), 200
            return jsonify({"error": "The attendance list is NOT FOUND."}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    @staticmethod
    def add_attendance_list_():
        try:
            data = request.json
            result = add_attendance_list(data)
            return dumps(result), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500