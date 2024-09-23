import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGO_URI = os.getenv('MONGO_URI')

    if MONGO_URI is None:
        raise ValueError("MONGO_DB environment variable not set.")