from flask import request, jsonify
from models.userModels import signup, login, get_user, update_user, delete_user, get_all_users, get_team, add_team_member
from bson.objectid import ObjectId
from bson.json_util import dumps

class User:

    @staticmethod
    def signup_():
        try:
            data = request.json
            user = signup(data)
            return jsonify(user), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    @staticmethod
    def login_():
        try:
            data = request.json
            user = login(data)
            return jsonify(user), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
        
    def get_user_(id):
        try:
            user_id = ObjectId(id)
            user_details = get_user(user_id)
            if user_details:
                return dumps(user_details)
            else:
                return jsonify({"error": "User NOT found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    def update_user_(id):
        try:
            user_id = ObjectId(id)
            user = request.json
            result = update_user(user_id, user)
            if result:
                return dumps(result)
            else:
                return jsonify({"error": "User NOT updated."}), 403
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    
    def delete_user_(id):
        try:
            user_id = ObjectId(id)
            user = delete_user(user_id)
            if user:
                return jsonify({"message": "User deleted successfuly"})
            else:
                return jsonify({"error": "User NOT found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    def get_all_users_():
        try:
            user = get_all_users()
            if user:
                return dumps(user)
            else:
                return jsonify({"error": "User NOT found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    def get_team_(institutionNum):
        try:
            team = get_team(institutionNum)
            if team:
                return dumps(team)
            else:
                return jsonify({"error": "Team is NOT found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    @staticmethod
    def add_team_():
        try:
            data = request.json
            user = add_team_member(data)
            return jsonify(user), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500