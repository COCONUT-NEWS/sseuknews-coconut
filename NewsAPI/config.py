# NewsAPI/config.py
import os
from dotenv import load_dotenv
load_dotenv()

DB_CONFIG = {
    "host": os.getenv("DB_HOST_API"),
    "user": os.getenv("DB_USER_API"),
    "password": os.getenv("DB_PASSWORD_API"),
    "database": os.getenv("DB_NAME_API"),
    "charset": "utf8mb4"
}