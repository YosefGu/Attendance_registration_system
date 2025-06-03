from flask import Blueprint, jsonify

utils = Blueprint('Utils', __name__)

@utils.route('/ping', methods=['GET'])
def ping():
    return jsonify({"success": True})
