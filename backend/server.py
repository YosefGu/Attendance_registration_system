from flask import Flask
from config import Config
from routes.user import users

app = Flask(__name__)
app.config.from_object(Config)

app.register_blueprint(users)


if __name__ == '__main__':
    app.run(debug=True)