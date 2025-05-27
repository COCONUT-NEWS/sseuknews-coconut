# News/config.py
import os

DB_CONFIG_AI = {
    "host": os.getenv("DB_HOST_NEWS"),
    "user": os.getenv(f"DB_USER_NEWS"),
    "password": os.getenv(f"DB_PASSWORD_NEWS"),
    "database": "coconut_ai",
    "charset": "utf8mb4"
}

DB_CONFIG_API = {
    "host": os.getenv("DB_HOST_NEWS"),
    "user": os.getenv(f"DB_USER_NEWS"),
    "password": os.getenv(f"DB_PASSWORD_NEWS"),
    "database": "coconut_api",
    "charset": "utf8mb4"
}

DB_CONFIG_NEWS = {
    "host": os.getenv("DB_HOST_NEWS"),
    "user": os.getenv(f"DB_USER_NEWS"),
    "password": os.getenv(f"DB_PASSWORD_NEWS"),
    "database": "coconut_news",
    "charset": "utf8mb4"
}

DB_CONFIGS = [DB_CONFIG_AI, DB_CONFIG_API, DB_CONFIG_NEWS]