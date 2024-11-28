# from flask import jsonify
from pymongo import MongoClient, ReturnDocument
from config import Config
import bcrypt
from email_validator import validate_email, EmailNotValidError
from password_validator import PasswordValidator
from flask_jwt_extended import create_access_token
from datetime import timedelta
from bson import ObjectId


client = MongoClient(Config.MONGO_URI)
db = client['Attendance_registration_system']
users_collection = db['users']

password_schema = PasswordValidator()
password_schema.min(8).max(20)

# Adding a user - signup
def signup(data):
    email = data['email']
    password = data.pop('password')

    data['title'] = 'kindergartner'

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

    exists = users_collection.find_one({"details.email":email})
    if exists:
        raise ValueError("Email allready in used.")
    
    salt = bcrypt.gensalt(10)
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    result = users_collection.insert_one({"password": hashed_password, "details": data})

    update_user(result.inserted_id, {"institutionNum": str(result.inserted_id)})

    access_token = create_access_token(identity=str(result.inserted_id), expires_delta=timedelta(days=60))
    
    if result.inserted_id:
        return {"message": "User created successfuly", "user_id": str(result.inserted_id), "access_token": access_token}
    else:
        raise ValueError("Failed to create user.") 

# login
def login(data):
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        raise ValueError("All field must be filled")
    
    user = users_collection.find_one({"details.email":email})
    
    if not user:
        raise ValueError("Incurrect email.")

    match = bcrypt.checkpw(password.encode('utf-8'), user['password'])  
    if not match:
         raise ValueError("Incurrect password.")
    
    access_token = create_access_token(identity=str(user['_id']), expires_delta=timedelta(days=60))
    
    return {"message": "User Login successfuly", "user_id": str(user['_id']), "access_token": access_token }

# Get a user
def get_user(id):
    user = users_collection.find_one(id)
    return user["details"]

# Update a user
def update_user(user_id, user_details):
    if 'password' in user_details:
        password = user_details.pop('password')
        if not password_schema.validate(password):
            raise ValueError("Password is not strong enough. It must contain at least 8 characters.")
        
        salt = bcrypt.gensalt(10)
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

        return users_collection.find_one_and_update(
            {"_id": user_id},
            {"$set":{ 
                **{f"details.{key}": value for key, value in user_details.items()},
                "password": hashed_password 
            }},
            return_document=ReturnDocument.AFTER
        )
    else: 
        return users_collection.find_one_and_update(
        {"_id": user_id},
        {"$set": {f"details.{key}": value for key, value in user_details.items()}},
        return_document=ReturnDocument.AFTER
    )

# Delete user
def delete_user(id):
    return users_collection.find_one_and_delete({"_id": id})

# Get all users
def get_all_users():
    return users_collection.find()

# Get team
def get_team(institutionNum):
    query = {
        'details.institutionNum': institutionNum,  
        '_id': {'$ne': ObjectId(institutionNum)}
    }
    projection = {
        '_id':1,
        'details':1
    }
    return users_collection.find(query, projection) 

def add_team_member(data):
    email = data['email']
    password = data['password']

    if not email or not password:
        raise ValueError('Email or Password are missing.')
    
    try:
        validate_email(email)
    except EmailNotValidError:
        raise ValueError("Email is not valid")
    
    exists = users_collection.find_one({"details.email":email})
    if exists:
        raise ValueError("Email allready in used.")
    
    salt = bcrypt.gensalt(10)
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

    data_copy =  data.copy()
    data_copy.pop('password', None)

    result = users_collection.insert_one({"password": hashed_password, "details": data_copy})
    
    
    if result.inserted_id:
        return {"message": "Adding member went successfuly", "user_id": str(result.inserted_id)}
    else:
        raise ValueError("Failed to create user.") 