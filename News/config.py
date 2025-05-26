# News/config.py
import os

def get_db_config(db_prefix):
    return {
        "host": os.getenv("DB_HOST_NEWS"),  # 공통 호스트라면 고정
        "user": os.getenv(f"DB_USER_NEWS"),
        "password": os.getenv(f"DB_PASSWORD_NEWS"),
        "database": os.getenv(f"DB_NAME_{db_prefix}"),
        "charset": "utf8mb4"
    }

DB_CONFIG_AI = get_db_config("AI")
DB_CONFIG_API = get_db_config("API")
DB_CONFIG_NEWS = get_db_config("NEWS")

DB_CONFIGS = [DB_CONFIG_AI, DB_CONFIG_API, DB_CONFIG_NEWS]

print("🔍 DB_NAME_API =", os.getenv("DB_NAME_API"))

for var in ["DB_NAME_API", "DB_NAME_AI", "DB_NAME_NEWS"]:
    print(f"🔍 {var} =", os.getenv(var))