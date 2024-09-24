from flask import request, jsonify
from models.userModels import add_user, get_user, update_user
from bson.objectid import ObjectId
from bson.json_util import dumps

class User:
    def add_new_user():
        try:
            data = request.json
            result = add_user(data)
            return jsonify({'_id': str(result.inserted_id)}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        

    def get_user_(id):
        try:
            user_id = ObjectId(id)
            user = get_user(user_id)
            if user:
                return dumps(user)
            else:
                return jsonify({"error": "User NOT found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    def update_user_(id, user):
        try:
            user_id = ObjectId(id)
            result = update_user(user_id, user)
            if result:
                return dumps(result)
            else:
                return jsonify({"error": "User NOT updated."}) 
        except Exception as e:
            return jsonify({"error": str(e)}), 500