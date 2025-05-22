# NewsAI/config.py
import os
from dotenv import load_dotenv
load_dotenv()

DB_CONFIG = {
    "host": os.getenv("DB_HOST_AI"),
    "user": os.getenv("DB_USER_AI"),
    "password": os.getenv("DB_PASSWORD_AI"),
    "database": os.getenv("DB_NAME_AI"),
    "charset": "utf8mb4"
}

# AWS Bedrock 관련 설정
AWS_REGION = "ap-northeast-1"
AWS_PROFILE = "default"