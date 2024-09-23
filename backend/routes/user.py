from flask import Blueprint, jsonify, request
from controllers.user import User

users = Blueprint('Users', __name__)

@users.route('/user', methods=['POST'])
def add_user_route():
    return User.add_new_user()