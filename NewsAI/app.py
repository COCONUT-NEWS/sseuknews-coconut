# NewsAI/app.py

from flask import Flask, jsonify
import pymysql
from summarize import summarize_with_bedrock
import os
import sys

# config 경로 추가
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../config')))
from config import AWS_REGION, AWS_PROFILE, DB_CONFIG

app = Flask(__name__)

# GET 요청 + URL 경로에서 뉴스 ID 받기
@app.route("/api/v1/summarize/<int:news_id>", methods=["GET"])
def summarize_news(news_id):
    try:
        conn = pymysql.connect(**DB_CONFIG, cursorclass=pymysql.cursors.DictCursor)
        cursor = conn.cursor()

        cursor.execute("SELECT content FROM news WHERE id = %s", (news_id,))
        row = cursor.fetchone()

        if not row:
            return jsonify({"status": "error", "message": "뉴스를 찾을 수 없습니다"}), 404

        summary = summarize_with_bedrock(row["content"])

        return jsonify({"status": "success", "summary": summary})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8009)
