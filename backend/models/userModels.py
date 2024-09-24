from pymongo import MongoClient
from config import Config

client = MongoClient(Config.MONGO_URI)
db = client['Attendance_registration_system']
users_collection = db['users']

# Adding a user
def add_user(user):
    return users_collection.insert_one(user)

# Get a user
def get_user(id):
    return users_collection.find_one(id)

# Update a user
def update_user(user_id, user):
    return users_collection.find_one_and_update(
        {"_id": user_id},
        {"$set": user},
        return_document=True
    )
