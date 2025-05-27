# NewsAPI/app.py

from flask import Flask, Response, request
import pymysql
import json
from config import DB_CONFIG

app = Flask(__name__)

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"}), 200

##################################
######## 카테고리별 키워드 조회 ########
##################################
@app.route("/api/v1/news/keywords", methods=["GET"])
def get_top_keywords():
    category_param = request.args.get("category", None)

    try:
        conn = pymysql.connect(**DB_CONFIG, cursorclass=pymysql.cursors.DictCursor)
        cursor = conn.cursor()

        # 조건 분기
        query = """
            SELECT category, keyword, count
            FROM top_keywords
            WHERE crawled_at = CURRENT_DATE
        """
        params = []

        if category_param:
            query += " AND category = %s"
            params.append(category_param)

        query += " ORDER BY category, count DESC"

        cursor.execute(query, params)
        result = cursor.fetchall()

        # 카테고리별 정리
        keywords_by_category = {}
        for row in result:
            category = row["category"]
            if category not in keywords_by_category:
                keywords_by_category[category] = []
            if len(keywords_by_category[category]) < 6:
                keywords_by_category[category].append({
                    "keyword": row["keyword"],
                    "count": row["count"]
                })

        response_json = json.dumps({
            "status": "success",
            "data": keywords_by_category
        }, ensure_ascii=False, indent=2)

        return Response(response_json, content_type="application/json; charset=utf-8")

    except Exception as e:
        return Response(json.dumps({
            "status": "error",
            "message": str(e)
        }, ensure_ascii=False, indent=2), content_type="application/json; charset=utf-8"), 500

    finally:
        if 'cursor' in locals(): cursor.close()
        if 'conn' in locals(): conn.close()

##################################
######## 카테고리별 뉴스 조회 #########
##################################
@app.route("/api/v1/news", methods=["GET"])
def get_news_by_category():
    category = request.args.get("category", None)

    if not category:
        return Response(json.dumps({
            "status": "error",
            "message": "카테고리 값을 query string으로 전달해주세요. 예: /api/v1/news?category=politics"
        }, ensure_ascii=False, indent=2), content_type="application/json; charset=utf-8"), 400

    try:
        conn = pymysql.connect(**DB_CONFIG, cursorclass=pymysql.cursors.DictCursor)
        cursor = conn.cursor()

        cursor.execute("""
            SELECT id, title, content
            FROM news
            WHERE category = %s
            ORDER BY RAND()
            LIMIT 10;
        """, (category,))

        news_list = []
        for row in cursor.fetchall():
            news_list.append({
                "id": row["id"],
                "title": row["title"],
                "preview": row["content"][:70]
            })

        response_json = json.dumps({
            "status": "success",
            "category": category,
            "data": news_list
        }, ensure_ascii=False, indent=2)

        return Response(response_json, content_type="application/json; charset=utf-8")

    except Exception as e:
        return Response(json.dumps({
            "status": "error",
            "message": str(e)
        }, ensure_ascii=False, indent=2), content_type="application/json; charset=utf-8"), 500

    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()

####################################
# 카테고리별, 키워드 선택 후 뉴스 목록 조회 #
####################################
@app.route("/api/v1/news/search", methods=["GET"])
def get_news_by_keyword():
    category = request.args.get("category")
    keyword = request.args.get("keyword")

    if not category or not keyword:
        return Response(json.dumps({
            "status": "error",
            "message": "category와 keyword 쿼리 파라미터가 필요합니다. 예: /api/v1/news/search?category=politics&keyword=\u0000"
        }, ensure_ascii=False, indent=2), content_type="application/json; charset=utf-8"), 400

    try:
        conn = pymysql.connect(**DB_CONFIG, cursorclass=pymysql.cursors.DictCursor)
        cursor = conn.cursor()

        cursor.execute("""
            SELECT n.id, n.title, LEFT(n.content, 70) AS preview
            FROM keyword_news_map km
            JOIN news n ON km.news_id = n.id
            WHERE km.keyword = %s AND n.category = %s
            ORDER BY n.published_at DESC
        """, (keyword, category))

        news_list = cursor.fetchall()

        response_json = json.dumps({
            "status": "success",
            "category": category,
            "keyword": keyword,
            "data": news_list
        }, ensure_ascii=False, indent=2)

        return Response(response_json, content_type="application/json; charset=utf-8")

    except Exception as e:
        return Response(json.dumps({
            "status": "error",
            "message": str(e)
        }, ensure_ascii=False, indent=2), content_type="application/json; charset=utf-8"), 500

    finally:
        if 'cursor' in locals(): cursor.close()
        if 'conn' in locals(): conn.close()



##################################
########## 뉴스 상세 조회 ###########
##################################
@app.route("/api/v1/news/<int:news_id>", methods=["GET"])
def get_news_detail(news_id):
    try:
        conn = pymysql.connect(**DB_CONFIG, cursorclass=pymysql.cursors.DictCursor)
        cursor = conn.cursor()

        cursor.execute("""
            SELECT id, title, content, reporter, published_at, source, url
            FROM news
            WHERE id = %s;
        """, (news_id,))

        news = cursor.fetchone()

        if not news:
            error_response = json.dumps({
                "status": "error",
                "message": f"뉴스 ID {news_id}에 해당하는 뉴스가 없습니다."
            }, ensure_ascii=False, indent=2)
            return Response(error_response, content_type="application/json; charset=utf-8"), 404

        response_json = json.dumps({
            "status": "success",
            "data": {
                "id": news["id"],
                "title": news["title"],
                "content": news["content"],
                "reporter": news.get("reporter"),
                "published_at": str(news.get("published_at")),
                "source": news["source"],
                "url": news["url"]
            }
        }, ensure_ascii=False, indent=2)

        return Response(response_json, content_type="application/json; charset=utf-8")

    except Exception as e:
        error_response = json.dumps({
            "status": "error",
            "message": str(e)
        }, ensure_ascii=False, indent=2)
        return Response(error_response, content_type="application/json; charset=utf-8"), 500

    finally:
        if 'cursor' in locals(): cursor.close()
        if 'conn' in locals(): conn.close()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8008)

