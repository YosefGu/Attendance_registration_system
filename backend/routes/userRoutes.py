from flask import Blueprint, request
from controllers.userControllers import User

users = Blueprint('Users', __name__)

@users.route('/user', methods=['POST'])
def add_user_route():
    return User.add_new_user()

@users.route('/user/<id>', methods=['GET'])
def get_user_route(id):
    return User.get_user_(id)

@users.route('/user/<id>', methods=['PUT'])
def update_user_route(id):
    data = request.json
    return User.update_user_(id, data)
    