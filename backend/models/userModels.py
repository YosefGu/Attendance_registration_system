# from flask import jsonify
from pymongo import MongoClient
from config import Config
import bcrypt
from email_validator import validate_email, EmailNotValidError
from password_validator import PasswordValidator


client = MongoClient(Config.MONGO_URI)
db = client['Attendance_registration_system']
users_collection = db['users']

password_schema = PasswordValidator()
password_schema.min(8).max(20)

# Adding a user - signup
def signup(data):
    email = data['email']
    password = data['password']

    if not email:
        raise ValueError("Email is required.") 
    if not password:
        raise ValueError( "Password is required.")
    
    try:
        validate_email(email)
    except EmailNotValidError:
        raise ValueError("Email is not valid")
    
    if not password_schema.validate(password):
        raise ValueError("Password is not strong enough. It must contain at least 8 characters.")

    exists = users_collection.find_one({"email":email})
    if exists:
        raise ValueError("Email allready in used.")
    
    salt = bcrypt.gensalt(10)
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    result = users_collection.insert_one({"email": email, "password": hashed_password})

    if result.inserted_id:
        return {"message": "User created successfuly", "user_id": str(result.inserted_id)}
    else:
        raise ValueError("Failed to create user.") 

# login
def login(data):
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        raise ValueError("All field must be filled")
    
    user = users_collection.find_one({"email":email})
    
    if not user:
        raise ValueError("Incurrect email.")

    match = bcrypt.checkpw(password.encode('utf-8'), user['password'])  
    if not match:
         raise ValueError("Incurrect password.")
    
    return {"message": "User Login successfuly", "user_id": str(user['_id'])}

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

# Delete user
def delete_user(id):
    return users_collection.find_one_and_delete(id)

# Get all users
def get_all_users():
    return users_collection.find()