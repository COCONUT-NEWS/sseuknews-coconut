import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="/app/.env") 

print("✅ DEBUG: DB_HOST_NEWS =", os.getenv("DB_HOST_NEWS"))

DB_CONFIG_AI = {
    "host": os.getenv("DB_HOST_AI"),
    "user": os.getenv("DB_USER_AI"),
    "password": os.getenv("DB_PASSWORD_AI"),
    "database": os.getenv("DB_NAME_AI"),
    "charset": "utf8mb4"
}

DB_CONFIG_API = {
    "host": os.getenv("DB_HOST_API"),
    "user": os.getenv("DB_USER_API"),
    "password": os.getenv("DB_PASSWORD_API"),
    "database": os.getenv("DB_NAME_API"),
    "charset": "utf8mb4"
}

DB_CONFIG_NEWS = {
    "host": os.getenv("DB_HOST_NEWS"),
    "user": os.getenv("DB_USER_NEWS"),
    "password": os.getenv("DB_PASSWORD_NEWS"),
    "database": os.getenv("DB_NAME_NEWS"),
    "charset": "utf8mb4"
}


DB_CONFIGS = [DB_CONFIG_AI, DB_CONFIG_API, DB_CONFIG_NEWS]
