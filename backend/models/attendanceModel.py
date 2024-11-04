from pymongo import MongoClient
from config import Config
from bson import ObjectId
from datetime import datetime, timedelta

client = MongoClient(Config.MONGO_URI)
db = client['Attendance_registration_system']
attendance_collection = db['attendance_lists']
 
# Get attendance list
def get_attendance_list():
    current_date = datetime.now().date() 
    target_date = datetime.combine(current_date, datetime.min.time()) 
    start_of_day = target_date
    end_of_day = target_date + timedelta(days=1)
    exists = attendance_collection.find_one({
        "_id": {
            "$gte": ObjectId.from_datetime(start_of_day),
            "$lt": ObjectId.from_datetime(end_of_day)
        }
    })
    if exists:
        return exists
    return None
    
# Add attendance list
def add_attendance_list(data):
    exists = get_attendance_list()
    if exists:
        result = attendance_collection.find_one_and_update(
            {"_id": exists["_id"]},
            {"$set": data}
        )
        return {"id": str(result["_id"]), "message": "Object updated successfully."}
    else:
        result = attendance_collection.insert_one(data)
        return {"id": result.inserted_id, "message":"New record created."}
