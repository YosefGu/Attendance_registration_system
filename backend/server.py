from flask import Flask
from config import Config
from routes.userRoutes import users
from flask_cors import CORS
from dotenv import load_dotenv
import os
load_dotenv()

host = os.getenv('HOST')
port = os.getenv('PORT')


app = Flask(__name__)

CORS(app)

app.config.from_object(Config)

app.register_blueprint(users)

if __name__ == '__main__':
    app.run(debug=True, host=host, port=port )