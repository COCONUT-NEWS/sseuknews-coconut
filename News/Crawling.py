# News/Crawling.py

import requests
from bs4 import BeautifulSoup
import datetime, time
import pymysql
from collections import Counter
from konlpy.tag import Okt
from config import DB_CONFIG_API, DB_CONFIGS

yesterday = (datetime.datetime.now() - datetime.timedelta(days=1)).strftime('%Y%m%d')

categories = {
    "politics": "100",
    "economy": "101",
    "society": "102",
    "culture": "103",
    "technology": "105",
    "world": "104"
}

headers = {"User-Agent": "Mozilla/5.0"}
all_news = []

# 뉴스 수집
for name, sid in categories.items():
    print(f"카테고리: {name}")
    page, count = 1, 0
    while count < 100:
        url = f"https://news.naver.com/main/list.naver?mode=LSD&mid=shm&sid1={sid}&date={yesterday}&page={page}"
        try:
            res = requests.get(url, headers=headers)
            res.encoding = 'euc-kr'
            soup = BeautifulSoup(res.text, "html.parser")
        except Exception as e:
            print(f"요청 실패: {e}")
            break

        items = soup.select("ul.type06_headline li dl dt:not(.photo) a")
        if not items:
            break

        for tag in items:
            if count >= 100:
                break
            try:
                news_url = tag["href"]
                title = tag.get_text(strip=True)
                detail_res = requests.get(news_url, headers=headers)
                detail_res.encoding = 'utf-8'
                detail_soup = BeautifulSoup(detail_res.text, "html.parser")

                content_tag = detail_soup.select_one("div#newsct_article")
                content = content_tag.get_text(strip=True) if content_tag else ""
                if not content:
                    continue

                reporter_tag = detail_soup.select_one("span.byline_s")
                reporter = reporter_tag.get_text(strip=True) if reporter_tag else None

                date_tag = detail_soup.select_one("span.media_end_head_info_datestamp_time")
                published_at = date_tag["data-date-time"] if date_tag and date_tag.has_attr("data-date-time") else None

                source_tag = detail_soup.select_one("a.media_end_head_top_logo img")
                source = source_tag["alt"] if source_tag and source_tag.has_attr("alt") else None

                all_news.append((name, title, news_url, content, reporter, published_at, source))
                print(f"{title}")
                count += 1
                time.sleep(0.1)
            except Exception as e:
                print(f"파싱 실패: {e}")
                continue
        page += 1

print(f"\n 전체 수집 완료: {len(all_news)}개 뉴스 수집됨.")

def save_news_to_mysql(news_data):
    for DB_CONFIG in DB_CONFIGS:
        conn, cursor = None, None
        try:
            conn = pymysql.connect(**DB_CONFIG)
            cursor = conn.cursor()

            # 모든 테이블 생성
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS news (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    category VARCHAR(50),
                    title TEXT,
                    url TEXT,
                    content LONGTEXT,
                    reporter VARCHAR(100),
                    published_at DATETIME,
                    source VARCHAR(100),
                    crawled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS top_keywords (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    category VARCHAR(50),
                    keyword VARCHAR(50),
                    count INT,
                    crawled_at DATE DEFAULT (CURRENT_DATE)
                );
            """)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS keyword_news_map (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    keyword VARCHAR(50),
                    news_id INT,
                    FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
                );
            """)

            # 이전 데이터 초기화화
            print(f"[{DB_CONFIG['database']}] 기존 뉴스 데이터 초기화")
            cursor.execute("SET FOREIGN_KEY_CHECKS = 0")
            cursor.execute("TRUNCATE TABLE keyword_news_map")
            cursor.execute("TRUNCATE TABLE top_keywords")
            cursor.execute("TRUNCATE TABLE news")
            cursor.execute("SET FOREIGN_KEY_CHECKS = 1")

            # 뉴스 저장
            sql = """
                INSERT INTO news (category, title, url, content, reporter, published_at, source)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            cursor.executemany(sql, news_data)
            conn.commit()
            print(f"[{DB_CONFIG['database']}] 뉴스 저장 완료: {len(news_data)}건")

        except Exception as e:
            print(f"[{DB_CONFIG['database']}] 뉴스 저장 실패: {e}")
        finally:
            if cursor: cursor.close()
            if conn: conn.close()


# 키워드 추출
def extract_top_keywords(news_data, top_n=6):
    okt = Okt()
    category_contents = {}
    for category, title, url, content, *_ in news_data:
        category_contents.setdefault(category, "")
        category_contents[category] += f" {title} {content}"
    category_keywords = {}
    for category, text in category_contents.items():
        nouns = [n for n in okt.nouns(text) if len(n) > 1]
        counter = Counter(nouns)
        category_keywords[category] = counter.most_common(top_n)
    return category_keywords

# 키워드 저장
def save_top_keywords_to_mysql(top_keywords):
    conn = pymysql.connect(**DB_CONFIG_API)
    cursor = conn.cursor()
    sql = "INSERT INTO top_keywords (category, keyword, count) VALUES (%s, %s, %s)"
    for category, keywords in top_keywords.items():
        for word, cnt in keywords:
            cursor.execute(sql, (category, word, cnt))
    conn.commit()
    cursor.close()
    conn.close()
    print(f"🗂️ 키워드 저장 완료: {sum(len(v) for v in top_keywords.values())}건")

# 키워드-뉴스 매핑 저장
def save_keyword_news_mapping(top_keywords):
    conn = pymysql.connect(**DB_CONFIG_API)
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, content FROM news WHERE DATE(crawled_at) = CURDATE()")
    news_rows = cursor.fetchall()

    sql = "INSERT INTO keyword_news_map (keyword, news_id) VALUES (%s, %s)"
    for category, keywords in top_keywords.items():
        for keyword, _ in keywords:
            for news_id, title, content in news_rows:
                if keyword in title or keyword in content:
                    cursor.execute(sql, (keyword, news_id))
    conn.commit()
    cursor.close()
    conn.close()
    print(f"🔗 키워드-뉴스 연결 완료")

# 실행 순서
save_news_to_mysql(all_news)
top_keywords = extract_top_keywords(all_news)
save_top_keywords_to_mysql(top_keywords)
save_keyword_news_mapping(top_keywords)


