from pymongo import MongoClient
from config import Config
from datetime import datetime, timedelta
from collections import defaultdict
from flask import Flask, send_file
from openpyxl import Workbook
import os
import pandas as pd
from io import BytesIO
from bson import ObjectId
import pandas as pd
from flask import send_file
from datetime import datetime, timedelta
from bson.objectid import ObjectId
import xlsxwriter

client = MongoClient(Config.MONGO_URI)
db = client['Attendance_registration_system']
attendance_collection = db['attendance_lists']
students_collection = db['students']


# Get period data
def get_period_data(id):
    # initial data for every period
    period_limits = {
        "week": (datetime.today() - timedelta(days=7)).date(),
        "twoWeeks": (datetime.today() - timedelta(days=14)).date(),
        "month": (datetime.today() - timedelta(days=30)).date(),
        "quarter": (datetime.today() - timedelta(days=90)).date(),
    }
    
    school_days_per_period = {key: 0 for key in period_limits}
    students = defaultdict(lambda: {key: 0 for key in period_limits})
    initialized = False

    for record in attendance_collection.find({"institutionNum": id}):
        record_date = record["_id"].generation_time.replace(tzinfo=None).date()
        
        # # First time: initialize all student IDs
        if not initialized:
            all_ids = record["checkedIDs"] + record["uncheckedIDs"]
            all_ids = [str(id['$oid']) for id in all_ids]
            for student_id in all_ids:
                students[student_id]  # Trigger defaultdict init
            initialized = True

        # Count school days per period
        for key, limit_date in period_limits.items():
            if record_date >= limit_date:
                school_days_per_period[key] += 1

        # Count per student (only checkedIDs)
        for student_id in record["checkedIDs"]:
            for key, limit_date in period_limits.items():
                if record_date >= limit_date:
                    students[str(student_id['$oid'])][key] += 1

    return  {"scholl_days": school_days_per_period, "students": students}

                
def create_period_file(user_id, data):
    start_str = data['start_date']
    end_str = data['end_date']

    start_date = datetime.strptime(start_str, "%d-%m-%Y")
    end_date = datetime.strptime(end_str, "%d-%m-%Y") + timedelta(days=1)

    students = students_collection.find({"institutionNum": user_id})
    attendance = attendance_collection.find({
        "institutionNum": user_id,
        "_id": {
            "$gte": ObjectId.from_datetime(start_date),
            "$lt": ObjectId.from_datetime(end_date)
        }
    }).sort('_id', 1)

    students_dict = {str(student['_id']): student for student in students}

    dates = []
    students_arrival = {}
    students_details = {"מס' זהות": [], "שם פרטי": [], "שם משפחה": []}

    for record in attendance:
        date_str = record['_id'].generation_time.strftime("%d-%m-%Y")
        dates.append(date_str)

        for id in record.get('checkedIDs', []):
            student_id = id['$oid']
            if student_id not in students_arrival:
                students_arrival[student_id] = {}
            students_arrival[student_id][date_str] = "הגיע"

        for id in record.get('uncheckedIDs', []):
            student_id = id['$oid']
            if student_id not in students_arrival:
                students_arrival[student_id] = {}
            students_arrival[student_id][date_str] = "לא הגיע"

    for student_id, arrival_dates in students_arrival.items():
        student = students_dict.get(student_id)
        if student:
            students_details["מס' זהות"].append(student.get('id', ''))
            students_details["שם פרטי"].append(student.get('name', ''))
            students_details["שם משפחה"].append(student.get('lName', ''))
        else:
            students_details["מס' זהות"].append('')
            students_details["שם פרטי"].append('')
            students_details["שם משפחה"].append('')

    for date in dates:
        students_details[date] = []
        for student_id in students_arrival.keys():
            status = students_arrival[student_id].get(date, "")
            students_details[date].append(status)

    df = pd.DataFrame(students_details)

    file_path = f'attendance {start_date}-{end_date}.xlsx'
    writer = pd.ExcelWriter(file_path, engine='xlsxwriter')
    df.to_excel(writer, index=False, sheet_name='Attendance')

    workbook = writer.book
    worksheet = writer.sheets['Attendance']

    # יישור מימין לשמאל
    worksheet.right_to_left()

    # פורמטים
    green_format = workbook.add_format({'bg_color': '#C6EFCE', 'font_color': '#006100'})
    red_format = workbook.add_format({'bg_color': '#FFC7CE', 'font_color': '#9C0006'})
    wrap_format = workbook.add_format({'text_wrap': True, 'align': 'center'})

    # עמודות ראשונות (ת"ז, שם פרטי, שם משפחה)
    worksheet.set_column('A:C', 20, wrap_format)

    # כל שאר העמודות - תאריכים
    for col_num, col_name in enumerate(df.columns):
        if col_num >= 3:
            worksheet.set_column(col_num, col_num, 15, wrap_format)
            for row_num in range(len(df)):
                value = df.iloc[row_num, col_num]
                cell_format = None
                if value == 'הגיע':
                    cell_format = green_format
                elif value == 'לא הגיע':
                    cell_format = red_format
                if cell_format:
                    worksheet.write(row_num + 1, col_num, value, cell_format)

    writer.close()

    return send_file(
        file_path,
        as_attachment=True,
        download_name=f"attendance_by_dates.xlsx",
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )