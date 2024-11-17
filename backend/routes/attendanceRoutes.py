from flask import Blueprint
from controllers.attendanceControllers import Attendance


attendance_lists = Blueprint('Attendance_lists', __name__)

@attendance_lists.route('/attendance-list/<id>', methods=['GET'])
def get_attendance_list_route(id):
    return Attendance.get_attendance_list_(id)

@attendance_lists.route('/attendance-list', methods=['POST'])
def add_attendance_list_route():
    return Attendance.add_attendance_list_()

