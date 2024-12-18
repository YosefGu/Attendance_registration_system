from flask import Flask, jsonify, request
from config import Config
from auth.jwt_handler import init_jwt
from flask_jwt_extended import verify_jwt_in_request
from flask_cors import CORS
from dotenv import load_dotenv
import os

from routes.userRoutes import users
from routes.studentRoutes import students
from routes.attendanceRoutes import attendance_lists

load_dotenv()

app = Flask(__name__)

CORS(app)

app.config.from_object(Config)

app.register_blueprint(users)
app.register_blueprint(students)
app.register_blueprint(attendance_lists)

jwt = init_jwt(app)
public_routes = ['/signup', '/login']

@app.before_request
def jwt_protect():
    if request.path not in public_routes:
        try:
            verify_jwt_in_request()
        except Exception as e:
            return jsonify({"error": "Unauthorized access", "token_message": str(e)}), 401


if __name__ == '__main__':
    app.run(debug=True, host= '0.0.0.0' , port=5000 )