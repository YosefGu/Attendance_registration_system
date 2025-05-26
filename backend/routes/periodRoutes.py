from flask import Blueprint
from controllers.periodControllers import Period

period_data = Blueprint("Period_data", __name__)

@period_data.route('/period-data/<id>', methods=['GET'])
def get_period_data(id):
    return Period._get_period_data(id)

@period_data.route('/period-file/<id>', methods=['POST'])
def create_period_file(id):
    return Period._create_period_file(id)