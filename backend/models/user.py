from pymongo import MongoClient
from config import Config

client = MongoClient(Config.MONGO_URI)
db = client['Attendance_registration_system']
users_collection = db['users']

# Adding a user
def add_user(user):
    return users_collection.insert_one(user)
