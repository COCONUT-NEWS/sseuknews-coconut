# Crawling.py

import requests
from bs4 import BeautifulSoup
import datetime, time
import pymysql
from collections import Counter
from konlpy.tag import Okt

from config import DB_CONFIG  # 로컬 설정

# 📅 전날 날짜
yesterday = (datetime.datetime.now() - datetime.timedelta(days=1)).strftime('%Y%m%d')

# 🗂️ 카테고리
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

for name, sid in categories.items():
    print(f"카테고리: {name}")
    page = 1
    count = 0

    while count < 10:
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
            if count >= 10:
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

                all_news.append((name, title, news_url, content))
                print(f"{title}")
                count += 1
                time.sleep(0.1)
            except Exception as e:
                print(f"파싱 실패: {e}")
                continue
        page += 1

print(f"\n🧾 전체 수집 완료: {len(all_news)}개 뉴스 수집됨.")

# ✅ 뉴스 저장 함수
def save_news_to_mysql(news_data):
    try:
        conn = pymysql.connect(**DB_CONFIG)
        cursor = conn.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS top_keywords (
                id INT AUTO_INCREMENT PRIMARY KEY,
                category VARCHAR(50),
                keyword VARCHAR(50),
                count INT,
                crawled_at DATE DEFAULT CURRENT_DATE
            );
        """)

        sql = "INSERT INTO news (category, title, url, content) VALUES (%s, %s, %s, %s)"
        cursor.executemany(sql, news_data)
        conn.commit()
        print(f"🗃️ 뉴스 저장 완료: {len(news_data)}건")
    except Exception as e:
        print(f"뉴스 저장 실패: {e}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# 키워드 추출 함수
def extract_top_keywords(news_data, top_n=6):
    okt = Okt()
    category_keywords = {}
    category_contents = {}

    for category, title, url, content in news_data:
        category_contents.setdefault(category, "")
        category_contents[category] += f" {title} {content}"

    for category, text in category_contents.items():
        nouns = okt.nouns(text)
        filtered = [n for n in nouns if len(n) > 1]
        counter = Counter(filtered)
        category_keywords[category] = counter.most_common(top_n)

    return category_keywords

# 키워드 저장 함수
def save_top_keywords_to_mysql(top_keywords):
    try:
        conn = pymysql.connect(**DB_CONFIG)
        cursor = conn.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS top_keywords (
                id INT AUTO_INCREMENT PRIMARY KEY,
                category VARCHAR(50),
                keyword VARCHAR(50),
                count INT,
                crawled_at DATE DEFAULT (CURRENT_DATE)
            );
        """)

        sql = "INSERT INTO top_keywords (category, keyword, count) VALUES (%s, %s, %s)"

        for category, keywords in top_keywords.items():
            for word, cnt in keywords:
                cursor.execute(sql, (category, word, cnt))

        conn.commit()
        print(f"키워드 저장 완료: {sum(len(v) for v in top_keywords.values())}건")
    except Exception as e:
        print(f"키워드 저장 실패: {e}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


# 실행
save_news_to_mysql(all_news)

top_keywords_by_category = extract_top_keywords(all_news)
for category, keywords in top_keywords_by_category.items():
    print(f"\n📌 {category.upper()} - 상위 키워드:")
    for word, count in keywords:
        print(f"  - {word}: {count}회")

save_top_keywords_to_mysql(top_keywords_by_category)
