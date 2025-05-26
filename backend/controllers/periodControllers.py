from flask import jsonify, request
from models.periodModel import get_period_data, create_period_file
from bson.json_util import dumps

class Period:
    @staticmethod
    def _get_period_data(id):
        try:
            result = get_period_data(id)
            return result, 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    
    def _create_period_file(id):
        try:
            data = request.get_json()
            return create_period_file(id, data), 200 
        except Exception as e:
            return jsonify({"error": str(e)}), 500