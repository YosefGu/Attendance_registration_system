from flask import Blueprint, request
from controllers.userControllers import User

users = Blueprint('Users', __name__)

@users.route('/signup', methods=['POST'])
def signup_route():
    return User.signup_()

@users.route('/login', methods=['POST'])
def login_route():
    return User.login_()

@users.route('/user/<id>', methods=['GET'])
def get_user_route(id):
    return User.get_user_(id)

@users.route('/user/<id>', methods=['PUT'])
def update_user_route(id):
    data = request.json
    return User.update_user_(id, data)

@users.route('/user/<id>', methods=['DELETE'])
def delete_user_route(id):
    return User.delete_user_(id) 

@users.route('/users', methods=['GET'])
def get_all_users():
    return User.get_all_users_()