from flask import request, jsonify
from models.user import add_user

class User:
    def add_new_user():
        try:
            data = request.json
            result = add_user(data)
            return jsonify({'_id': str(result.inserted_id)}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        

