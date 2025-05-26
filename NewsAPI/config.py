# NewsAPI/config.py
import os
from dotenv import load_dotenv
load_dotenv()

print("✅ DEBUG: DB_HOST_API =", os.getenv("DB_HOST_API"))

DB_CONFIG = {
    "host": "coconut-db.clkkkki229kj.ap-northeast-1.rds.amazonaws.com",
    "user": os.getenv("DB_USER_API"),
    "password": os.getenv("DB_PASSWORD_API"),
    "database": os.getenv("DB_NAME_API"),
    "charset": "utf8mb4"
}